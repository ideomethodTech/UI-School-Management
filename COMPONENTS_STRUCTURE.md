# Components Folder Structure

This document describes the reorganized component structure for the UI School Management application.

## Overview

The components have been categorized into role-specific folders and shared components to improve discoverability and maintainability.

## Folder Structure

```
src/components/
├── admin/          # Admin-specific components
├── parent/         # Parent-specific components
├── student/        # Student-specific components
├── teacher/        # Teacher-specific components
├── modals/         # Modal components used across the application
└── shared/         # Shared/common components used by multiple roles
```

## Detailed Breakdown

### 📁 admin/ (5 files)
Admin dashboard and administrative functions:
- `AdminAssignmentsPage.js` - Manage all assignments
- `AdminClassesPage.js` - Manage all classes
- `AdminDashboardHome.js` - Admin dashboard home page
- `AdminExamsPage.js` - Manage all exams
- `MarkAttendanceSection.js` - Mark/edit attendance for students

### 📁 parent/ (4 files)
Parent portal components:
- `ParentAttendancePage.js` - View student attendance records
- `ParentDashboardHome.js` - Parent dashboard home page
- `ParentEventPage.js` - View school events calendar
- `ParentSidebar.js` - Parent-specific sidebar navigation

### 📁 student/ (6 files)
Student portal components:
- `StudentAssignmentsPage.js` - View and submit assignments
- `StudentAttendancePage.js` - View personal attendance
- `StudentClassesPage.js` - View enrolled classes
- `StudentDashboardHome.js` - Student dashboard home page
- `StudentExamsPage.js` - View exam schedule and results
- `StudentResultsPage.js` - View detailed academic results

### 📁 teacher/ (6 files)
Teacher portal components:
- `TeacherAssignmentsPage.js` - Create and manage assignments
- `TeacherAttendancePage.js` - Mark and review attendance
- `TeacherDashboardHome.js` - Teacher dashboard home page
- `TeacherExamsPage.js` - Create and manage exams
- `TeacherResultsPage.js` - Enter and view student results
- `TeachersClassesPage.js` - Manage assigned classes

### 📁 modals/ (6 files)
Reusable modal components:
- `AttendanceModal.js` - Modal for marking attendance
- `GradesModal.js` - Modal for entering grades
- `ManageClassModal.js` - Modal for class management
- `Modal.js` - Base modal component
- `StudentsListModal.js` - Modal displaying student lists
- `TeacherModal.js` - Teacher-related modal dialogs

### 📁 shared/ (17 files)
Components used across multiple roles:
- `Announcements.js` - Announcements widget
- `AttendanceCalendar.js` - Calendar view for attendance
- `AttendanceCourseFilter.js` - Filter attendance by course
- `AttendanceTable.js` - Table displaying attendance data
- `Avatar.js` - User avatar component
- `ClassesTable.js` - Table displaying classes
- `EventCalendar.js` - Calendar for events
- `LessonsTable.js` - Table displaying lessons
- `Performance.js` - Performance metrics widget
- `ProfileDetails.js` - User profile details view
- `ResultsTable.js` - Table displaying results
- `Sidebar.js` - Main admin sidebar
- `SimpleSidebar.js` - Simplified sidebar for student/teacher
- `TeachersTable.js` - Table displaying teachers
- `Topbar.js` - Top navigation bar
- `UpcomingAssignments.js` - Upcoming assignments widget
- `UserCard.js` - User information card

## Import Path Changes

All imports have been updated to use absolute paths with the new structure:

### Examples:

**Admin components:**
```javascript
import AdminDashboardHome from '@/components/admin/AdminDashboardHome';
import MarkAttendanceSection from '@/components/admin/MarkAttendanceSection';
```

**Parent components:**
```javascript
import ParentDashboardHome from '@/components/parent/ParentDashboardHome';
import ParentSidebar from '@/components/parent/ParentSidebar';
```

**Student components:**
```javascript
import StudentDashboardHome from '@/components/student/StudentDashboardHome';
import StudentResultsPage from '@/components/student/StudentResultsPage';
```

**Teacher components:**
```javascript
import TeacherDashboardHome from '@/components/teacher/TeacherDashboardHome';
import TeachersClassesPage from '@/components/teacher/TeachersClassesPage';
```

**Modal components:**
```javascript
import AttendanceModal from '@/components/modals/AttendanceModal';
import GradesModal from '@/components/modals/GradesModal';
```

**Shared components:**
```javascript
import Sidebar from '@/components/shared/Sidebar';
import Topbar from '@/components/shared/Topbar';
import Avatar from '@/components/shared/Avatar';
```

## Benefits

1. **Better Organization**: Components are grouped by role/purpose
2. **Easier Discovery**: Find components quickly by navigating to the appropriate folder
3. **Improved Maintainability**: Clear separation of concerns
4. **Scalability**: Easy to add new components to the appropriate category
5. **Team Collaboration**: Multiple developers can work on different role folders with minimal conflicts

## Migration Notes

- All relative imports (`./Component`) have been converted to absolute imports (`@/components/folder/Component`)
- All dashboard pages in `src/app/dashboard/*` have been updated with new import paths
- The dev server should continue running without errors after these changes
