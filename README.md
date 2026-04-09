# KK-Snapshots-V2

# K&K Industries — Weekly Site Position

A static, client-side web application designed to display weekly site positions and overall project health for K&K Industries. The dashboard provides a high-level snapshot of all active jobs, alongside detailed drill-downs for each project.

## Features

- **KPI Dashboard**: Instantly view the total number of jobs and their distribution across statuses: *At Risk*, *Monitor*, *On Track*, and *Data Gaps*.
- **Search & Filtering**: Filter jobs by their current status or use the search bar to find specific projects.
- **Job Grid Summary**: A quick overview of each job, including immediate escalations, holding ups, site reality, labour status, and next actions.
- **Detailed Drill-Down**: Click on any job to view deeper insights, including manager assessments, data quality details, and a day-by-day weekly activity log.

## Project Structure

The project relies entirely on core web technologies and does not require a build process or bundler.

- `index.html` — The main document shell.
- `style.css` — Custom styling, CSS variable-driven design tokens, and responsive layout instructions.
- `app.js` — All DOM manipulation, state management, filtering logic, and view transitions.
- `data.js` — Contains the `APP_DATA` variable that populates the entire site (projects, logs, reporting dates, etc.).

## How to Run

Since the application uses static files, simple load `index.html` into any modern web browser to view the reporting dashboard. No server or compilation is required.

## Data Updates

To update the dashboard for a new week:
1. Open the `data.js` file.
2. Update the `reportDate` and `updatedDate`.
3. Modify or add entries inside the `jobs` array containing each project's latest statuses, manager notes, and `weeklyLog`. 
