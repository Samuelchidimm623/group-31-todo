class Task {
  constructor(text, id) {
    this.id = id
    this.text = text
    this.completed = false
    this.createdAt = new Date().toISOString()
  }
}

class TodoApp {
  constructor() {
    this.storageKey = 'group-31-tasks'
    this.tasks = this.load()

    this.form = document.getElementById('taskForm')
    this.input = document.getElementById('taskInput')
    this.list = document.getElementById('tasklist')
    this.errorMsg = document.getElementById('errorMsg')
    this.emptyState = document.getElementById('emptyState')

    this.bindEvents()
    this.render()
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('Could not read saved tasks', e)
      return []
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks))
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.addTask(this.input.value)
    })
  }

  addTask(rawText) {
    const text = rawText.trim()
    if (!text) {
      this.errorMsg.textContent = "A task can't be empty — type something first."
      return
    }
    if (text.length > 120) {
      this.errorMsg.textContent = 'Keep it under 120 characters.'
      return
    }
    this.errorMsg.textContent = ''
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    this.tasks.unshift(new Task(text, id))
    this.input.value = ''
    this.save()
    this.render()
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.save()
      this.render()
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.save()
    this.render()
  }

  editTask(id, newText) {
    const trimmed = newText.trim()
    if (!trimmed) {
      this.deleteTask(id)
      return
    }
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.text = trimmed
      this.save()
      this.render()
    }
  }

  render() {
    this.list.innerHTML = ''

    let doneCount = 0
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].completed) doneCount++
    }
    document.getElementById('countTotal').textContent = this.tasks.length
    document.getElementById('countDone').textContent = doneCount
    document.getElementById('countOpen').textContent = this.tasks.length - doneCount

    this.emptyState.style.display = this.tasks.length === 0 ? 'block' : 'none'

    this.tasks.forEach((task) => {
      const li = document.createElement('li')
      li.className = task.completed ? 'done' : ''

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.className = 'task-checkbox'
      checkbox.checked = task.completed
      checkbox.setAttribute('aria-label', 'Toggle complete')
      checkbox.addEventListener('change', () => this.toggleTask(task.id))

      const body = document.createElement('div')
      body.className = 'body'

      const textEl = document.createElement('div')
      textEl.className = 'task-text'
      textEl.textContent = task.text

      const meta = document.createElement('div')
      meta.className = 'meta'
      const d = new Date(task.createdAt)
      meta.textContent = 'added ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      body.appendChild(textEl)
      body.appendChild(meta)

      const actions = document.createElement('div')
      actions.className = 'actions'

      const editBtn = document.createElement('button')
      editBtn.type = 'button'
      editBtn.className = 'icon-btn'
      editBtn.textContent = 'Edit'
      editBtn.addEventListener('click', () => this.startEdit(body, textEl, actions, task))

      const delBtn = document.createElement('button')
      delBtn.type = 'button'
      delBtn.className = 'icon-btn del'
      delBtn.textContent = 'Delete'
      delBtn.addEventListener('click', () => this.deleteTask(task.id))

      actions.appendChild(editBtn)
      actions.appendChild(delBtn)

      li.appendChild(checkbox)
      li.appendChild(body)
      li.appendChild(actions)
      this.list.appendChild(li)
    })
  }

  startEdit(body, textEl, actions, task) {
    const editInput = document.createElement('input')
    editInput.className = 'edit-input'
    editInput.type = 'text'
    editInput.value = task.text
    editInput.maxLength = 120
    body.replaceChild(editInput, textEl)
    editInput.focus()
    editInput.select()

    const commit = () => this.editTask(task.id, editInput.value)

    actions.innerHTML = ''

    const saveBtn = document.createElement('button')
    saveBtn.type = 'button'
    saveBtn.className = 'icon-btn save'
    saveBtn.textContent = 'Save'
    saveBtn.addEventListener('click', commit)

    const cancelBtn = document.createElement('button')
    cancelBtn.type = 'button'
    cancelBtn.className = 'icon-btn'
    cancelBtn.textContent = 'Cancel'
    cancelBtn.addEventListener('click', () => this.render())

    actions.appendChild(saveBtn)
    actions.appendChild(cancelBtn)

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit()
      if (e.key === 'Escape') {
        e.preventDefault()
        this.render()
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => new TodoApp())
