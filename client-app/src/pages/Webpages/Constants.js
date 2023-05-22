
export const isArrayEquals = (a, b) => {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};

export const optionGroupCategory = [
  {
    label: "Category",
    options: [
      { label: "Services", value: "Services" },
      { label: "Industry", value: "Industry" },
      { label: "Technologies", value: "Technologies" },
      { label: "Career", value: "Career" },
      { label: "Blogs", value: "Blogs" }
    ],
  },

];

export const optionGroup = [
  {
    label: "Members",
    options: [

      { label: "Ashish", value: "Ashish" },
      { label: "Nilesh", value: "Nilesh" },
      { label: "Milan", value: "Milan" },

    ],
  },

];

export const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
    width: 150,
  },
  {
    label: "Category",
    field: "category",
    sort: "asc",
    width: 270,
  },
  {
    label: "Web Page",
    field: "webpage",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Published On",
    field: "date",
    sort: "asc",
    width: 200,
  },
  {
    label: "Assigned To",
    field: "assigned_to",
    sort: "disabled",
    width: 200,
  },
  {
    label: "Effective From",
    field: "effective_from",
    sort: "asc",
    width: 270,
  },

  {
    label: "Action",
    field: "action",
    width: 200,
    sort: "disabled",
  },

];

export const payload = {
  "options": {
    "populate": [
      {
        "path": "addedBy",
        "select": ["name", "email"]
      },
      {
        "path": "assignedTo",
        "select": ["name", "avatar", "userRole"]
      }
    ]
  }
}