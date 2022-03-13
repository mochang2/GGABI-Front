export const contactLeftbarMap = {
  "#": [], "ㄱ": [], "ㄴ": [],
 "ㄷ": [], "ㄹ": [], "ㅁ": [],
 "ㅂ": [], "ㅅ": [], "ㅇ": [],
 "ㅈ": [], "ㅊ": [], "ㅋ": [],
 "ㅌ": [], "ㅍ": [], "ㅎ": [],
 "A": [], "B": [], "C": [],
 "D": [], "E": [], "F": [],
 "G": [], "H": [], "I": [],
 "J": [], "K": [], "L": [],
 "M": [], "N": [], "O": [],
 "P": [], "Q": [], "R": [],
 "S": [], "T": [], "U": [],
 "V": [], "W": [], "X": [],
 "Y": [], "Z": []
};


export const formatPhone = (phone) => {
  if (phone.length === 0) return "X";
  if (phone.includes("-")) return phone;
  if (phone.length === 10) return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6, 10);
  if (phone.length === 11) return phone.slice(0, 3) + "-" + phone.slice(3, 7) + "-" + phone.slice(7, 11);
}


export const sortCmpFuncContact = (a,b) => {
  if (a.nickname > b.nickname) return 1;
  else if (a.nickname < b.nickname) return -1;
  else {
    if (a.company > b.company) return 1;
    else if (a.company < b.company) return -1;
    else return 0;
  }
}



// BE 없을 때
export const responseData = [
  { 
    "id": 1, "parentId": 0, "username": "inguser", "nickname": "i잉유저", "phone": "01000001234",  "email": "inguser@ggabi.co.kr",
    "position": "인턴", "department": "회계", "company": "깨비", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 2, "parentId": 0, "username": "imuser", "nickname": "아임유저", "phone": "01000001234",  "email": "imuser@naver.com",
    "position": "인턴", "department": "보안", "company": "네이버 파이낸셜", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 3, "parentId": 0, "username": "series3000", "nickname": "s시리즈", "phone": "01000001234",  "email": "series3000@daum.net",
    "position": "사원", "department": "사무", "company": "카카오뱅크", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 4, "parentId": 0, "username": "philips", "nickname": "필립스", "phone": "01000001234",  "email": "philips@google.com",
    "position": "사원", "department": "개발", "company": "한국인터넷진흥원", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 5, "parentId": 0, "username": "sksmsx146", "nickname": "나는ㅌ", "phone": "01000001234",  "email": "sksmsx146@ggabi.co.kr",
    "position": "대리", "department": "인사", "company": "한양대학교", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 6, "parentId": 0, "username": "maxoverpro", "nickname": "오버프로", "phone": "01000001234",  "email": "maxoverpro@nate.com",
    "position": "대리", "department": "세글자", "company": "조금이름이긴기업이있을수있지", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 7, "parentId": 0, "username": "holymoly", "nickname": "홀리몰리", "phone": "01000001234",  "email": "holymoly@longlonglonglonglonglonglonglonglonglongdomain.com",
    "position": "차장", "department": "네에글자", "company": "ㅋㅋㅋㅋㅋㅋㅋ", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 8, "parentId": 0, "username": "healing", "nickname": "힐링", "phone": "01000001234",  "email": "healing@healing.com",
    "position": "차장", "department": "회계", "company": "아마존", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 9, "parentId": 0, "username": "yun", "nickname": "★윤", "phone": "01000001234",  "email": "yun@ffff",
    "position": "과장", "department": "인사", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 10, "parentId": 0, "username": "dentist", "nickname": "치과", "phone": "01000001234",  "email": "dentist@shortdomain.com",
    "position": "과장", "department": "세글자", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 11, "parentId": 0, "username": "easyshave", "nickname": "이지쉐이브", "phone": "01000001234",  "email": "easyshave@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 12, "parentId": 0, "username": "convenient", "nickname": "끌편리한1길게길게길게길게길게길게길게길게", "phone": "01000001234",  "email": "convenient1@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 13, "parentId": 0, "username": "convenient", "nickname": "끌편리한2", "phone": "01000001234",  "email": "convenient2@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 14, "parentId": 0, "username": "convenient", "nickname": "끌편리한3", "phone": "",  "email": "convenient3@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 15, "parentId": 0, "username": "convenient", "nickname": "끌편리한4", "phone": "01000001234",  "email": "convenient4@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
  { 
    "id": 16, "parentId": 0, "username": "convenient", "nickname": "끌편리한5", "phone": "01000001234",  "email": "convenient5@ggabi.co.kr",
    "position": "부사장", "department": "보안", "company": "회사", "isCreated": "2022-02-14T11:32:33.000+0000"
  },
];