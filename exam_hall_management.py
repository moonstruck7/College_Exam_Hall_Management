# ============================================================
# PROJECT-5: COLLEGE EXAM HALL MANAGEMENT SYSTEM
# OS RESOURCE MANAGEMENT SIMULATION
# ============================================================

import threading
import time
from collections import OrderedDict


# ============================================================
# CO1 - SYSTEM INFORMATION / BATCH PROCESSING
# ============================================================

def system_information():
    print("\n" + "=" * 60)
    print("        COLLEGE EXAM HALL MANAGEMENT SYSTEM")
    print("=" * 60)

    print("\nSYSTEM INFORMATION")
    print("-" * 40)
    print("OS Model          : Batch Processing System")
    print("Total Halls       : 4")
    print("Total Students    : 12")
    print("Total Invigilators : 4")
    print("Departments       : Computer, IT, Mechanical, Civil")
    print("Exam Duration     : 3 Hours")

    print("\nBatch Processing:")
    print("1. Load student data")
    print("2. Allocate examination halls")
    print("3. Assign invigilators")
    print("4. Generate seating plan")
    print("5. Generate examination files")

    print("\nExam data will be processed as a batch.")


# ============================================================
# CO2 - PROCESS MANAGEMENT
# Each Student = Process
# ============================================================

students = [
    {"pid": "P101", "name": "Aarav", "dept": "Computer"},
    {"pid": "P102", "name": "Riya", "dept": "Computer"},
    {"pid": "P103", "name": "Aditya", "dept": "Computer"},
    {"pid": "P104", "name": "Sneha", "dept": "IT"},
    {"pid": "P105", "name": "Rahul", "dept": "IT"},
    {"pid": "P106", "name": "Priya", "dept": "IT"},
    {"pid": "P107", "name": "Om", "dept": "Mechanical"},
    {"pid": "P108", "name": "Ananya", "dept": "Mechanical"},
    {"pid": "P109", "name": "Karan", "dept": "Mechanical"},
    {"pid": "P110", "name": "Neha", "dept": "Civil"},
    {"pid": "P111", "name": "Vivek", "dept": "Civil"},
    {"pid": "P112", "name": "Isha", "dept": "Civil"}
]


def student_processes():
    print("\n" + "=" * 60)
    print("             STUDENT PROCESS MANAGEMENT")
    print("=" * 60)

    print("\nEach student's exam session is treated as a PROCESS.\n")

    print(f"{'PID':<10}{'Student':<15}{'Department':<15}{'Status'}")
    print("-" * 55)

    for student in students:
        print(
            f"{student['pid']:<10}"
            f"{student['name']:<15}"
            f"{student['dept']:<15}"
            f"READY"
        )


# ============================================================
# CO2 - MULTITHREADING
# Each Invigilator = Thread
# ============================================================

invigilators = [
    {"id": "I1", "name": "Mr. Patil", "priority": 1},
    {"id": "I2", "name": "Ms. Sharma", "priority": 2},
    {"id": "I3", "name": "Mr. Khan", "priority": 3},
    {"id": "I4", "name": "Ms. Joshi", "priority": 4}
]


def invigilator_thread(invigilator, hall):
    print(
        f"{invigilator['id']} - {invigilator['name']} "
        f"is monitoring {hall}"
    )

    # Simulate thread activity
    time.sleep(0.5)

    print(
        f"{invigilator['id']} completed monitoring of {hall}"
    )


def multithreading_demo():
    print("\n" + "=" * 60)
    print("             MULTITHREADING MODEL")
    print("=" * 60)

    print("\nInvigilator is represented as a THREAD.")
    print("Each thread supervises one examination hall.\n")

    threads = []

    for i in range(len(invigilators)):
        hall = "H" + str(i + 1)

        thread = threading.Thread(
            target=invigilator_thread,
            args=(invigilators[i], hall)
        )

        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    print("\nAll invigilator threads completed.")


# ============================================================
# CO3 - FCFS HALL ALLOCATION
# ============================================================

halls = [
    {"hall": "H1", "capacity": 30},
    {"hall": "H2", "capacity": 30},
    {"hall": "H3", "capacity": 30},
    {"hall": "H4", "capacity": 30}
]


def fcfs_hall_allocation():
    print("\n" + "=" * 60)
    print("              FCFS HALL ALLOCATION")
    print("=" * 60)

    print("\nFCFS = First Come First Serve")
    print("Hall requests are processed in arrival order.\n")

    departments = ["Computer", "IT", "Mechanical", "Civil"]

    print(f"{'Request':<10}{'Department':<15}{'Hall':<10}")
    print("-" * 35)

    for i in range(len(departments)):
        print(
            f"R{i + 1:<9}"
            f"{departments[i]:<15}"
            f"{halls[i]['hall']:<10}"
        )


# ============================================================
# CO3 - PRIORITY SCHEDULING
# ============================================================

def priority_invigilator_allocation():
    print("\n" + "=" * 60)
    print("          PRIORITY INVIGILATOR ALLOCATION")
    print("=" * 60)

    print("\nSmaller priority number = Higher priority.\n")

    sorted_invigilators = sorted(
        invigilators,
        key=lambda x: x["priority"]
    )

    print(
        f"{'Invigilator':<15}"
        f"{'Priority':<10}"
        f"{'Assigned Hall'}"
    )

    print("-" * 40)

    for i, inv in enumerate(sorted_invigilators):
        print(
            f"{inv['name']:<15}"
            f"{inv['priority']:<10}"
            f"H{i + 1}"
        )


# ============================================================
# CO3 - DEADLOCK DETECTION
# Resource Allocation Graph
# ============================================================

def deadlock_detection():
    print("\n" + "=" * 60)
    print("                DEADLOCK DETECTION")
    print("=" * 60)

    print("\nResource Allocation:")
    print("I1 holds H1 and waits for Projector")
    print("I2 holds Projector and waits for H1")

    print("\nResource Allocation Graph:")
    print("I1 -> Projector")
    print("Projector -> I2")
    print("I2 -> H1")
    print("H1 -> I1")

    # Graph representation
    graph = {
        "I1": ["Projector"],
        "Projector": ["I2"],
        "I2": ["H1"],
        "H1": ["I1"]
    }

    visited = set()
    recursion_stack = set()

    def detect_cycle(node):

        visited.add(node)
        recursion_stack.add(node)

        for neighbour in graph.get(node, []):

            if neighbour not in visited:
                if detect_cycle(neighbour):
                    return True

            elif neighbour in recursion_stack:
                return True

        recursion_stack.remove(node)
        return False

    deadlock = False

    for node in graph:
        if node not in visited:
            if detect_cycle(node):
                deadlock = True
                break

    if deadlock:
        print("\nWARNING: DEADLOCK DETECTED!")
        print("A cycle exists in the Resource Allocation Graph.")
    else:
        print("\nNo deadlock detected.")


# ============================================================
# CO4 - SEATING PLAN AS MEMORY PAGES
# ============================================================

def seating_pages():
    print("\n" + "=" * 60)
    print("              SEATING PLAN MEMORY PAGES")
    print("=" * 60)

    print("\nEach seating plan is divided into memory pages.\n")

    seating = {
        "H1": ["Seats 1-10", "Seats 11-20", "Seats 21-30"],
        "H2": ["Seats 1-10", "Seats 11-20", "Seats 21-30"],
        "H3": ["Seats 1-10", "Seats 11-20", "Seats 21-30"],
        "H4": ["Seats 1-10", "Seats 11-20", "Seats 21-30"]
    }

    for hall, pages in seating.items():

        print(f"\n{hall}")

        for i, page in enumerate(pages):
            print(f"  Page {i + 1} -> {page}")


# ============================================================
# CO4 - LRU PAGE REPLACEMENT
# ============================================================

def lru_page_replacement():

    print("\n" + "=" * 60)
    print("              LRU PAGE REPLACEMENT")
    print("=" * 60)

    print("\nNumber of memory frames = 3\n")

    pages = [
        "H1-P1",
        "H2-P1",
        "H3-P1",
        "H1-P2",
        "H4-P1",
        "H2-P1"
    ]

    capacity = 3

    # OrderedDict maintains usage order
    memory = OrderedDict()

    page_faults = 0

    print(
        f"{'Page':<10}"
        f"{'Result':<20}"
        f"{'Memory'}"
    )

    print("-" * 55)

    for page in pages:

        if page in memory:

            memory.move_to_end(page)

            result = "Page Hit"

        else:

            page_faults += 1

            if len(memory) == capacity:

                removed_page, _ = memory.popitem(last=False)

                result = "Page Fault - Replaced " + removed_page

            else:

                result = "Page Fault"

            memory[page] = True

        print(
            f"{page:<10}"
            f"{result:<20}"
            f"{list(memory.keys())}"
        )

    print("\nTotal Page Faults:", page_faults)


# ============================================================
# CO5 - CONTIGUOUS FILE ALLOCATION
# ============================================================

def contiguous_file_allocation():

    print("\n" + "=" * 60)
    print("           CONTIGUOUS FILE ALLOCATION")
    print("=" * 60)

    files = [
        {
            "name": "Computer_H1_Seating.txt",
            "start": 10,
            "blocks": 5
        },
        {
            "name": "IT_H2_Seating.txt",
            "start": 20,
            "blocks": 4
        },
        {
            "name": "Mechanical_H3_Seating.txt",
            "start": 30,
            "blocks": 6
        },
        {
            "name": "Civil_H4_Seating.txt",
            "start": 40,
            "blocks": 5
        }
    ]

    print(
        f"\n{'File':<30}"
        f"{'Start':<10}"
        f"{'Blocks'}"
    )

    print("-" * 55)

    for file in files:

        print(
            f"{file['name']:<30}"
            f"{file['start']:<10}"
            f"{file['blocks']}"
        )

        blocks = []

        for i in range(file["blocks"]):
            blocks.append(file["start"] + i)

        print("Disk blocks:", blocks)


# ============================================================
# CO5 - TREE STRUCTURED DIRECTORY
# ============================================================

def tree_directory():

    print("\n" + "=" * 60)
    print("             TREE DIRECTORY STRUCTURE")
    print("=" * 60)

    print("""
College_Exam/
|
+-- Computer/
|   +-- Semester_4/
|       +-- Seating_Plan.txt
|       +-- Student_List.txt
|
+-- IT/
|   +-- Semester_4/
|       +-- Seating_Plan.txt
|       +-- Student_List.txt
|
+-- Mechanical/
|   +-- Semester_4/
|       +-- Seating_Plan.txt
|       +-- Student_List.txt
|
+-- Civil/
    +-- Semester_4/
        +-- Seating_Plan.txt
        +-- Student_List.txt
""")


# ============================================================
# COMPLETE EXAM SCHEDULE
# ============================================================

def complete_schedule():

    print("\n" + "=" * 60)
    print("             COMPLETE EXAM SCHEDULE")
    print("=" * 60)

    print(
        f"\n{'Student':<12}"
        f"{'Department':<15}"
        f"{'Hall':<8}"
        f"{'Seat':<10}"
    )

    print("-" * 50)

    for i, student in enumerate(students):

        hall_number = (i // 3) + 1
        seat_number = (i % 3) + 1

        print(
            f"{student['name']:<12}"
            f"{student['dept']:<15}"
            f"H{hall_number:<7}"
            f"S{seat_number}"
        )


# ============================================================
# MAIN MENU
# ============================================================

def main():

    while True:

        print("\n")
        print("=" * 60)
        print("       COLLEGE EXAM HALL MANAGEMENT SYSTEM")
        print("=" * 60)

        print("""
1. System Information / Batch Processing
2. Student Process Management
3. Invigilator Multithreading
4. FCFS Hall Allocation
5. Priority Invigilator Allocation
6. Deadlock Detection
7. Seating Plan Memory Pages
8. LRU Page Replacement
9. Contiguous File Allocation
10. Tree Directory Structure
11. Complete Exam Schedule
12. Run All Modules
13. Exit
""")

        choice = input("Enter your choice: ")

        if choice == "1":
            system_information()

        elif choice == "2":
            student_processes()

        elif choice == "3":
            multithreading_demo()

        elif choice == "4":
            fcfs_hall_allocation()

        elif choice == "5":
            priority_invigilator_allocation()

        elif choice == "6":
            deadlock_detection()

        elif choice == "7":
            seating_pages()

        elif choice == "8":
            lru_page_replacement()

        elif choice == "9":
            contiguous_file_allocation()

        elif choice == "10":
            tree_directory()

        elif choice == "11":
            complete_schedule()

        elif choice == "12":

            system_information()
            student_processes()
            multithreading_demo()
            fcfs_hall_allocation()
            priority_invigilator_allocation()
            deadlock_detection()
            seating_pages()
            lru_page_replacement()
            contiguous_file_allocation()
            tree_directory()
            complete_schedule()

        elif choice == "13":
            print("\nThank you!")
            print("Examination Management System terminated.")
            break

        else:
            print("\nInvalid choice. Please try again.")


# ============================================================
# PROGRAM START
# ============================================================

if __name__ == "__main__":
    main()