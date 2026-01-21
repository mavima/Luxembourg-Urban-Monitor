# 🇪🇺 Public Service Dashboard: Regional Monitoring

A professional dashboard built with the **eUI Framework** for monitoring regional data, combining **Geoportail.lu** mapping with administrative task management.

## 👥 The Team

* **Maria** (Lead Developer): Architecture & Code Review
* **Joe**: Frontend Components & API Integration

## 🛠 Quick Start
* `ng serve`: Start with (Development)
* `npm start`: Start with **Mock Server** (Development)
* `npm run start-proxy`: Start with **Real Backend**
* `npm run build-prod`: Production build (Lint + Tests)

## 📍 Key Features

| Feature | API / Source | eUI Component |
| --- | --- | --- |
| **Map View** | Geoportail.lu V4 | `eui-page` + `eui-sidebar` |
| **Service Mgmt** | JSONPlaceholder | `eui-table` + `eui-card` |
| **Data Insights** | Open Data Portal | `eui-charts` (ECharts) |

## 💡 Dev Notes

* **State:** Powered by **Angular Signals** for reactive data fetching.
* **Maps:** Requires Geoportail loader script in `index.html`.
* **Workflow:** Feature branches only. PRs require approval from **Maria**.

## 🆘 Resources

* [eUI Documentation](https://eui.ecdevops.eu)