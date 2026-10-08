import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AddTaskForm from '../AddTaskForm.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'

const mountForm = () => mount(AddTaskForm, { props: { columnId: 'todo' } })

const openForm = async (wrapper: ReturnType<typeof mountForm>) => {
  await wrapper.get('button').trigger('click')
}

const buttonByText = (wrapper: ReturnType<typeof mountForm>, text: string) => {
  const button = wrapper.findAll('button').find((item) => item.text() === text)
  if (!button) throw new Error(`Button "${text}" not found`)
  return button
}

describe('AddTaskForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows only the "Add task" button until it is opened', async () => {
    const wrapper = mountForm()

    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.text()).toContain('Add task')

    await openForm(wrapper)

    expect(wrapper.findAll('input')).toHaveLength(2)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('does not add a task and shows an error for every empty field', async () => {
    const wrapper = mountForm()
    const store = useTaskBoard()
    await openForm(wrapper)

    await buttonByText(wrapper, 'Add Task').trigger('click')

    expect(wrapper.findAll('[role="alert"]')).toHaveLength(3)
    expect(store.tasks.todo).toBeUndefined()
  })

  it('treats fields with only spaces as empty', async () => {
    const wrapper = mountForm()
    const store = useTaskBoard()
    await openForm(wrapper)

    const [title, assignee] = wrapper.findAll('input')
    await title.setValue('   ')
    await assignee.setValue('Ana')
    await wrapper.get('textarea').setValue('Some comment')
    await buttonByText(wrapper, 'Add Task').trigger('click')

    expect(wrapper.findAll('[role="alert"]')).toHaveLength(1)
    expect(store.tasks.todo).toBeUndefined()
  })

  it('adds the task to its column and clears the form', async () => {
    const wrapper = mountForm()
    const store = useTaskBoard()
    await openForm(wrapper)

    const [title, assignee] = wrapper.findAll('input')
    await title.setValue('Write tests')
    await assignee.setValue('Ana')
    await wrapper.get('textarea').setValue('Store and form first')
    await buttonByText(wrapper, 'Add Task').trigger('click')

    expect(store.tasks.todo).toHaveLength(1)
    expect(store.tasks.todo[0]).toMatchObject({
      title: 'Write tests',
      assignee: 'Ana',
      comment: 'Store and form first',
    })
    expect(store.tasks.todo[0].id).toEqual(expect.any(String))
    expect((title.element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('textarea').element as HTMLTextAreaElement).value).toBe('')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('closes the form with the cancel button', async () => {
    const wrapper = mountForm()
    await openForm(wrapper)

    await wrapper.get('button[aria-label="Cancel new task"]').trigger('click')

    expect(wrapper.find('input').exists()).toBe(false)
  })
})
