---
creation-date: <% tp.file.creation_date() %>
modification-date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
type: project
tags: 
project-name: <% tp.file.title %>
company-name:
---
 
## Info 📑

- [project-name:: <% tp.file.title %> ] 
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
WHERE contains(text, this.file.name)
```


#project