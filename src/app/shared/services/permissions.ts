
export const appScopes = {
  admin: {
    users: {
      view: true,
      viewAll: true,
      edit: true,
      editAll: true
    },
    expenses: {
      view: true,
      viewAll: true,
      edit: true,
      editAll: true
    }
  },
  manager: {
    users: {
      view: true,
      viewAll: true,
      edit: false,
      editAll: false
    },
    expenses: {
      view: true,
      viewAll: true,
      edit: true,
      editAll: true
    }
  },
  user: {
    users: {
      view: false,
      viewAll: false,
      edit: false,
      editAll: false
    },
    expenses: {
      view: true,
      viewAll: false,
      edit: true,
      editAll: false
    }
  }
};
