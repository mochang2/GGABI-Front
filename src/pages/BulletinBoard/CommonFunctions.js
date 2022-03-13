export const sortCmpFuncPost = (a,b) => {
  if (a.is_notice !== b.is_notice) {
    if (b.is_notice === true) return 1;
    else return -1;
  }
  else {
    if (a.isCreated < b.isCreated) return 1;
    else if (a.isCreated > b.isCreated) return -1;
    else return 0;
  }
}

export const sortCmpFuncComment = (a,b) => {
  if (a.isCreated > b.isCreated) return 1;
  else if (a.isCreated < b.isCreated) return -1;
  else return 0;
}