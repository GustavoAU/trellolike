import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskBoard } from '../useTaskBoardStore'

const makeTask = (id: string, title = `Task ${id}`) => ({
  id,
  title,
  assignee: 'Ana',
  comment: 'Check before Friday',
})

describe('useTaskBoard store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with an empty board', () => {
    const store = useTaskBoard()

    expect(store.getColumns).toEqual([])
    expect(store.tasks).toEqual({})
  })

  it('adds columns in the order they are created', () => {
    const store = useTaskBoard()

    store.addColumn({ id: 'todo', title: 'To do' })
    store.addColumn({ id: 'done', title: 'Done' })

    expect(store.getColumns.map((column) => column.title)).toEqual(['To do', 'Done'])
  })

  it('renames a column and ignores unknown ids', () => {
    const store = useTaskBoard()
    store.addColumn({ id: 'todo', title: 'To do' })

    store.editColumn('todo', { id: 'todo', title: 'Backlog' })
    store.editColumn('missing', { id: 'missing', title: 'Nope' })

    expect(store.getColumns).toEqual([{ id: 'todo', title: 'Backlog' }])
  })

  it('adds tasks to the right column', () => {
    const store = useTaskBoard()
    store.addColumn({ id: 'todo', title: 'To do' })
    store.addColumn({ id: 'done', title: 'Done' })

    store.addTask({ columnId: 'todo', task: makeTask('1') })
    store.addTask({ columnId: 'todo', task: makeTask('2') })
    store.addTask({ columnId: 'done', task: makeTask('3') })

    expect(store.tasks.todo.map((task) => task.id)).toEqual(['1', '2'])
    expect(store.tasks.done.map((task) => task.id)).toEqual(['3'])
  })

  it('removes only the selected task', () => {
    const store = useTaskBoard()
    store.addColumn({ id: 'todo', title: 'To do' })
    const first = makeTask('1')
    store.addTask({ columnId: 'todo', task: first })
    store.addTask({ columnId: 'todo', task: makeTask('2') })

    store.removeTask({ columnId: 'todo', task: first })

    expect(store.tasks.todo.map((task) => task.id)).toEqual(['2'])
  })

  it('edits a task without touching the others', () => {
    const store = useTaskBoard()
    store.addColumn({ id: 'todo', title: 'To do' })
    store.addTask({ columnId: 'todo', task: makeTask('1') })
    store.addTask({ columnId: 'todo', task: makeTask('2') })

    store.editTask('todo', '1', { ...makeTask('1'), title: 'Updated', assignee: 'Luis' })

    expect(store.tasks.todo[0]).toMatchObject({ title: 'Updated', assignee: 'Luis' })
    expect(store.tasks.todo[1].title).toBe('Task 2')
  })

  it('deletes the tasks of a column when the column is removed', () => {
    const store = useTaskBoard()
    store.addColumn({ id: 'todo', title: 'To do' })
    store.addColumn({ id: 'done', title: 'Done' })
    store.addTask({ columnId: 'todo', task: makeTask('1') })
    store.addTask({ columnId: 'done', task: makeTask('2') })

    store.removeColumn('todo')

    expect(store.getColumns.map((column) => column.id)).toEqual(['done'])
    expect(store.tasks).not.toHaveProperty('todo')
    expect(store.tasks.done).toHaveLength(1)
  })
})
