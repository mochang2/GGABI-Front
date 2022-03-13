const LinkTo = {
  // Admin
  analysis: "/admin/analysis",
  applicantApproval: "/admin/applicant-approval", 
  blockMailServer: "/admin/block-mail-server",
  employeeManagement: "/admin/employee-management", 
  gatherEmails: "/admin/gather-company-mails",

  // Authentication
  logout: "/auth/logout", 
  login: "/auth/login", 
  findPasswd: "/auth/find-passwd", 
  signup:"/auth/signup", 
  
  // Calendar
  calendarYear: "/calendar/year",
  calendarMonth: "/calendar/month",
  calendarWeek: "/calendar/week",
  calendarDay: "/calendar/day",
  calendarTemplate: "/calendar/template",
  
  // Contacts
  contactFixed: "/contacts/fixed",
  ContactPersonal: "/contacts/personal",
  contactsGridTemplate: "/contacts-grid/template",
  contactsListTemplate: "/contacts-list/template",
  contactsProfileTemplate: "/contacts-profile/template",

  // Diligence And Negligence
  attendanceCheck: "/attendance", 

  // Email
  emailCategoryAd: "/email/category-ad",
  emailCategorySocial: "/email/category-social",
  emailCategorySpam: "/email/category-spam",
  emailFromToMebox: "/email/from-me-to-me-box",
  emailImportantbox: "/email/importantbox",
  emailInbox: "/email/inbox",
  emailReservationbox: "/email/reservationbox",
  emailTemporarybox: "/email/temporarybox",
  emailSpambox: "/email/spambox",
  emailSentbox: "/email/sentbox",
  emailTrashbox: "/email/trashbox",
  emailWholebox: "/email",

  // Email Approval
  emailEndApproval: "/email/approval/endbox",
  emailRejectApproval: "/email/approval/rejectbox",
  emailRequestApproval: "/email/approval/requestbox",
  emailWaitApproval: "/email/approval/waitbox",

  // Notice
  AllPostsList: "/notice/list/all", 
  BoardPostsList: "/notice/list",
  WritePost: "/notice/write",
  
  // Profile
  // profile: "/profile",

  // Setting
  changePasswd: "/setting/change-passwd",
  changePersonalInfo: "/setting/change-personal-info",
  setting: "/setting",
  withdrawMembership: "/setting/withdrawal",

  // SMS
  SMSInbox: "/SMS/inbox", 
  SMSSentbox: "/SMS/sentbox", 

  // Terms And Conditions
  collectPersonalInfo: "/terms-and-conditions/collect",
  receivePromotion: "/terms-and-conditions/receive",
  useGgabi: "/terms-and-conditions/use",

  // Utility
  utility: "/utility", 

  // Defulat
  default: "/email/inbox"
};

export default LinkTo