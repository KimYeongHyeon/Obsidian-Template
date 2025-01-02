---
creation-date: <% tp.file.creation_date() %> 
modification-date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
type: company
tags: #company #client
---	 

- [company-name:: <% tp.file.title %>  ]
- [company-location:: ]
- [company-description:: ]

## Related Projects
```dataview 
LIST
FROM !"__Templates"
WHERE type = "project"
WHERE contains(company, this.file.link) 
```


## Related People
```dataview 
LIST
FROM !"__Templates"
WHERE type = "person"
WHERE contains(company, this.file.link) 
```


#company