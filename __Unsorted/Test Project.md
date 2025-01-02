---
creation-date: 2025-01-02 15:08
modification-date: Thursday 2nd January 2025 15:08:15
type: project
tags: 
project-name: Test Project
---
 
## Info 📑

- [project-name:: Test Project ] 
- [project-start:: ]
- [project-end:: ]
- [project-members::  [[Person A]], [[Person B]] ] 
- [project-pm:: [[Person A]] ]
- [project-description::  ]


##  🌅 Meetings
```dataview
TABLE
from !"__Templates"
WHERE contains(type, "meeting") and contains(project, this.file.link)
```

## 📚 Logs
```dataview
TABLE
rows.Details as "Details"
from !"__Templates"
WHERE contains(log, this.file.name) 
FLATTEN log as Details
WHERE contains(Details, this.file.name) 
GROUP BY file.link as Source
SORT row.file.day desc
```

## 🚀 Tasks Left

```dataview
TASK
from !"__Templates"
WHERE contains(type, "dailytodo") and !completed
WHERE contains(text, this.name)
```


#project