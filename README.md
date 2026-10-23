# College Examination Hall Management System

This project demonstrates operating-system resource-management concepts through a sample college examination scenario. It includes a menu-driven Python simulation and a browser-based dashboard.

> **Note:** This is an educational simulation using predefined sample data. It is not intended to manage live examination records or schedules.

## Features

- Models 12 students, 4 departments, 4 examination halls, and 4 invigilators.
- Demonstrates batch processing and student process management.
- Simulates invigilator activity using Python threads.
- Illustrates FCFS hall allocation and priority-based invigilator assignment.
- Detects cycles in a sample resource-allocation graph to demonstrate deadlock detection.
- Demonstrates memory pages and LRU page replacement.
- Shows contiguous file allocation and a tree-structured directory.
- Displays a sample student seating schedule.
- Provides a web dashboard for exploring the project and its OS course-outcome modules.

## Requirements

- Python 3
- A modern web browser for the dashboard

The Python programs use only the Python standard library; no package installation is required.

## Run the command-line simulation

From the project directory, run:

```bash
python exam_hall_management.py
```

Choose a numbered option from the menu to run an individual module. Select **12** to run all modules, or **13** to exit.

## Run the web dashboard

From the project directory, run:

```bash
python run_web_ui.py
```

The launcher starts a local HTTP server and opens the dashboard in your default browser at `http://localhost:8080/index.html`. If port 8080 is already in use, it attempts port 8081. Press **Ctrl+C** in the terminal to stop the server.

## Project structure

| File | Purpose |
|---|---|
| `exam_hall_management.py` | Menu-driven Python implementation of the OS simulations. |
| `run_web_ui.py` | Starts the local server for the browser dashboard. |
| `index.html` | Dashboard page structure and navigation. |
| `style.css` | Dashboard styling and responsive layout. |
| `app.js` | Dashboard data, interactions, and simulation views. |
| `.gitignore` | Excludes common Python caches and local development artifacts from Git. |

## Concepts demonstrated

| OS concept | Project demonstration |
|---|---|
| Batch processing | Exam data is presented as a batch of steps to process. |
| Process management | Each student is represented as a process with an ID and status. |
| Multithreading | A thread simulates each invigilator monitoring a hall. |
| FCFS scheduling | Department hall requests are assigned in arrival order. |
| Priority scheduling | Invigilators are ordered by priority; a smaller number indicates higher priority. |
| Deadlock detection | A cycle in a resource-allocation graph is detected as a deadlock. |
| Paging and LRU | Seating pages are accessed using a three-frame LRU simulation. |
| File allocation and directories | Sample contiguous disk blocks and a department-based directory tree are displayed. |

## Limitations

The project uses fixed sample data and illustrative allocation rules. It does not save changes, validate real hall capacity, authenticate users, or connect to a database.
