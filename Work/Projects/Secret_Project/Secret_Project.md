---
creation-date: 2024-12-31 16:14
modification-date: Thursday 2nd January 2025 10:57:18
type: project
tags: 
project-name: Secret_Project
---
 
## Info 📑

- [project-name:: Secret_Project ] 
- [project-start:: ]
- [project-end:: ]
- [project-members::  [[Person A]], [[Person B]] ] 
- [project-pm:: [[Person A]] ]
- [project-description::  ]


##  🌅 Meetings
```dataview
TABLE
from !"Templates"
WHERE contains(type, "meeting") and contains(project, this.file.link)
```

## 📚 Logs
```dataview
TABLE
rows.Details as "Details"
from !"Templates"
WHERE contains(tag, this.file.name) 
FLATTEN log as Details
WHERE contains(Details, this.file.name) 
GROUP BY file.link as Source
SORT row.file.day desc
```

## 🚀 Tasks Left

```dataview
TASK
from !"Templates"
WHERE contains(type, "dailytodo") and !completed
WHERE contains(text, this.name)
```