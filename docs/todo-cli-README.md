# Todo-cli

A command-line todo application for managing daily tasks efficiently from the terminal.

## ✨ Features

- Add, list, complete, and delete tasks
- Mark tasks as done or in-progress
- Persistent storage across sessions
- Simple, fast, zero-dependency usage

## 📦 Installation

```bash
# Build from source (requires Go)
git clone https://github.com/h1ntz0/Todo-cli.git
cd Todo-cli
go build -o todo ./cmd/todo

# Or install directly
go install github.com/h1ntz0/Todo-cli/cmd/todo@latest
```

## 🚀 Usage

```bash
# Add a new task
todo add "Buy groceries"

# List all tasks
todo list

# Mark a task as done
todo done 1

# Delete a task
todo delete 1
```

## 🛠️ Tech Stack

- [Go](https://go.dev/)

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

> **Note**: This is a draft README. Update the features, commands, and usage examples to match the actual implementation.
