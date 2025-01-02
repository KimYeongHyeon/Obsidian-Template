---
creation-date: 2025-01-02 17:35
modification-date: Thursday 2nd January 2025 17:35:53
type: project
tags: 
project-name: ZenAI100
company-name: DB손해보험
---
 
## Info 📑

- [project-name:: ZenAI100 ] 
- [project-start:: 2024-07-30]
- [project-end:: ]
- [project-members::  ] 
- [project-pm::  ]
- [project-description::  생성형AI의 급진적인 성장에 따른 사내에 생성형AI 문화 확산]


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
// WHERE contains(type, "dailytodo")
WHERE !completed
WHERE contains(text, this.file.name)
```

### ✅ Tasks Done
```dataview
table without id "[[" + file.name + "|" + file.name + "]]" as "Date", regexreplace(L.text, "^\[\[.*?\]\]\s*", "") as List
from "Diary"
flatten file.lists as L
where contains(this.file.inlinks, file.link) and contains(L.text, this.file.name)
sort file.name asc
```

#project