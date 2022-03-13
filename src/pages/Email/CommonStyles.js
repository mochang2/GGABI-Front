//// mailbox

import { pink } from '@mui/material/colors'
// mail checkbox
export const checkboxStyle = {
  '&.MuiCheckbox-root': {
    marginTop: "4px",
    padding: '3px 0 3px 12px',
  },
  '&.Mui-checked': {
    color: pink[600],
  },
  '& .MuiSvgIcon-root': { 
    fontSize: 18 
  },
  '& .MuiCheckbox-indeterminate': {
    color: pink[600]
  },
};


//// mail sidebar



//// mail toolbar
export const toolBarBtnStyle = {
  borderRadius: 0
};

export const toolBarSpanInBtnStyle = {
  fontSize: "0.8rem",
};




//// each mail
// sender, receiver, CC dropdown
export const SRCDropdownStyle = {
  padding: "2px 6px",
  fontSize: "0.8rem",
};