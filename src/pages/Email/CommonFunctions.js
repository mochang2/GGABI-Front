//// common
// TODO: BE data axios post
// check as an important mail
export const checkAsImportantMail = (event) => {
  if (event.target.style.color !== "gold"){ event.target.style.color = "gold"; }
  else { event.target.style.color = "black"; }
}


//// mailbox
// mail date formatter
export const formatDate = (date)=>{
  const endDate = new Date();
  const startDate = new Date(date);
  const dateDiff = ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const wasBeforeThanToday = endDate.getDate() !== startDate.getDate();

  if (dateDiff >= 1 || wasBeforeThanToday) { // 1일 이상 차이가 나거나, 같은 날이 아니라면
    return startDate.getFullYear().toString() + "-" + (startDate.getMonth() + 1).toString() + "-" + startDate.getDate().toString();
  }
  else { // endDate: n - 1월 30일 vs startDate: n월 1일 이런 경우를 방지하기 위해
    const minute = startDate.getMinutes().toString().length === 1 ? "0" + startDate.getMinutes().toString() : startDate.getMinutes().toString();
    const second = startDate.getSeconds().toString().length === 1 ? "0" + startDate.getSeconds().toString() : startDate.getSeconds().toString();
    return startDate.getHours().toString() + ":" + minute + ":" + second;
  }
};

// mapping checkbox
export const mapMailCheckedAndMailData = (mailChecked, mailDataLength) => {
  let mailCheckTrueIndex = [];
  for (let i = 0; i < mailDataLength; i++) {
    if (mailChecked[i] === true) {
      mailCheckTrueIndex.push(i);
    }
  }
  return mailCheckTrueIndex;
}

// determine mail traffic-light color
export const trafficLightId = (flag, danger) => {
  if (flag === null || flag === undefined) return "undetermined";

  if (danger === -1) {
    if (flag === 0) return "undetermined";
    else if (flag === 1 || flag === 2) return "normal";
    else return "dangerous";
  }
  else {
    if (danger < 0.3) return "normal";
    else if (danger < 0.7) return "warning";
    else return "dangerous"
  }
}



//// mail sidebar



//// mail toolbar
// changes tags in html content for editor state 
// each mail에서도 사용
export const ChangeTagInMailContent = (mailContent) => {
  // 두껍게
  mailContent = mailContent.replace(/<b>/gm, "<strong>");
  mailContent = mailContent.replace(/<\/b>/gm, "</strong>");
  // 밑줄
  mailContent = mailContent.replace(/<u>/gm, "<ins>");
  mailContent = mailContent.replace(/<\/u>/gm, "</ins>");
  // 기울기
  mailContent = mailContent.replace(/<i>/gm, "<em>");
  mailContent = mailContent.replace(/<\/i>/gm, "</em>");
  // 취소선
  mailContent = mailContent.replace(/<strike>/gm, "<del>");
  mailContent = mailContent.replace(/<\/strike>/gm, "</del>");

  return mailContent
}

// mailbox component에서 currentMailData 부분이 re-rendering되도록
export const reRenderCurrentMailData = (setSelectNum, selectNum) => {
  setSelectNum(0);
  setSelectNum(selectNum);
}



//// each mail
// attachment size formatter
export const formatSize = (size) => {
  if (size < 1024) return size.toString() + "Byte"
  else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + "KB"
  else if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + "MB"
  else return (size / (1024 * 1024 * 1024)).toFixed(1) + "GB"
}

  // sender, receiver, CC dropdown style using event
export const handleOnMouseOver = (event) => { event.target.style.textDecoration = "underline"; }
export const handleOnMouseLeave = (event) => { event.target.style.textDecoration = "none"; }


//// mail write modal
// sort func
export const sortCmpFuncContact = (a,b) => {
  if (a.nickname > b.nickname) return 1;
  else if (a.nickname < b.nickname) return -1;
  else return 0;
}
