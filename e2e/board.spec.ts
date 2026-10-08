import { test, expect, type Page } from '@playwright/test'

const addList = async (page: Page, name: string) => {
  const addListButton = page.getByRole('button', { name: 'Add list' })
  if (await addListButton.isVisible()) await addListButton.click()
  await page.getByRole('textbox', { name: 'List name' }).fill(name)
  await page.getByRole('button', { name: 'Add Column' }).click()
}

test('shows an empty board on first visit', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('There are no columns, add one')).toBeVisible()
})

test('creates a list, adds a task, edits it and deletes it', async ({ page }) => {
  await page.goto('/')
  await addList(page, 'To do')

  const column = page.locator('.SingleColumn', { hasText: 'To do' })
  await expect(column).toBeVisible()

  await column.getByRole('button', { name: 'Add task' }).click()
  await column.getByRole('textbox', { name: 'Insert task' }).fill('Write the README')
  await column.getByRole('textbox', { name: 'Assignee' }).fill('Gustavo')
  await column.getByRole('textbox', { name: 'Place a comment' }).fill('Add screenshots')
  await column.getByRole('button', { name: 'Add Task' }).click()

  const task = column.locator('.SingleTask', { hasText: 'Write the README' })
  await expect(task).toContainText('Assignee: Gustavo')

  await task.getByRole('button', { name: 'Edit Write the README' }).click()
  await page.getByRole('textbox', { name: 'edit title' }).fill('Write the README and CI')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(column.getByText('Write the README and CI')).toBeVisible()

  await column
    .locator('.SingleTask')
    .getByRole('button', { name: 'Delete Write the README and CI' })
    .click()
  await page.getByRole('button', { name: 'Confirm' }).click()
  await expect(column.locator('.SingleTask')).toHaveCount(0)
})

test('does not create a list without a name', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Add list' }).click()
  await page.getByRole('button', { name: 'Add Column' }).click()

  await expect(page.getByRole('alert')).toHaveText('Please fill out this field.')
  await expect(page.locator('.SingleColumn')).toHaveCount(0)
})

test('deleting a list asks for confirmation first', async ({ page }) => {
  await page.goto('/')
  await addList(page, 'Temporary')

  await page.getByRole('button', { name: 'Delete Temporary' }).click()
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(page.locator('.SingleColumn')).toHaveCount(1)

  await page.getByRole('button', { name: 'Delete Temporary' }).click()
  await page.getByRole('button', { name: 'Confirm' }).click()
  await expect(page.locator('.SingleColumn')).toHaveCount(0)
})
