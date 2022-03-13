import React from "react"
import { Redirect } from "react-router-dom"

// Admin
import Analysis from "../pages/Admin/Analysis"
import ApplicantApproval from "../pages/Admin/ApplicantApproval"
import BlockMailServer from "../pages/Admin/BlockMailServer"
import EmployeeManagement from "../pages/Admin/EmployeeManagement"
import EachMailAnalysis from "../pages/Admin/EachMailAnalysis"
import GatherCompanyEmails from "../pages/Admin/GatherCompanyEmails"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Signup from "../pages/Authentication/Signup"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Calendar
import CalendarYear from "../pages/Calendar/CalendarYear"
import CalendarMonth from "../pages/Calendar/CalendarMonth"
import CalendarWeek from "../pages/Calendar/CalendarWeek"
import CalendarDay from "../pages/Calendar/CalendarDay"
    //template
import CalendarTemplate from "../pages/CalendarTemplate/index"

// Contacts
import ContactFixed from "../pages/Contacts/ContactFixed"
import ContactPersonal from "../pages/Contacts/ContactPersonal"
    //template
import ContactsListTemplate from "../pages/ContactsTemplate/ContactList/contacts-list-template"
import ContactsProfile from "../pages/ContactsTemplate/ContactsProfile/contacts-profile"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Diligence And Negligence
import AttendanceCheck from "../pages/DiligenceAndNegligence/AttendanceCheck"

// Email
import EmailCategoryAd from "../pages/Email/EmailCategoryAd"
import EmailCategorySocial from "../pages/Email/EmailCategorySocial"
import EmailCategorySpam from "../pages/Email/EmailCategorySpam"
import EmailFromToMebox from "../pages/Email/EmailFromToMebox"
import EmailImportantbox from "../pages/Email/EmailImportantbox"
import EmailInbox from "../pages/Email/EmailInbox"
import EmailInboxRead from "../pages/Email/EmailInboxRead"
import EmailReservationbox from "../pages/Email/EmailReservationbox"
import EmailSentbox from "../pages/Email/EmailSentbox"
import EmailSentboxRead from "../pages/Email/EmailSentboxRead"
import EmailTemporarybox from "../pages/Email/EmailTemporarybox"
import EmailTrashbox from "../pages/Email/EmailTrashbox"
import EmailWholebox from "../pages/Email/EmailWholebox"

// Email Approval
import EmailApprovalbox from "../pages/EmailApproval/EmailApprovalbox"
import EndApprovalRead from "../pages/EmailApproval/EndApprovalRead"
import RejectApprovalRead from "../pages/EmailApproval/RejectApprovalRead"
import RequestApprovalRead from "../pages/EmailApproval/RequestApprovalRead"
import WaitApprovalRead from "../pages/EmailApproval/WaitApprovalRead"

// Utility
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"
import MapsLeaflet from "../pages/Maps/MapsLeaflet"

// Notice
import AllPostsList from "../pages/BulletinBoard/AllPostsList"
import BoardPostsList from "../pages/BulletinBoard/BoardPostsList"
import ReadPost from "../pages/BulletinBoard/ReadPost"
import WritePost from "../pages/BulletinBoard/WritePost"

// Setting
import ChangePasswd from "../pages/Setting/ChangePasswd"
import ChangePersonalInfo from "../pages/Setting/ChangePersonalInfo"
import Setting from "../pages/Setting/Setting"
import WithdrawMembership from "../pages/Setting/WithdrawMembership"

// SMS
import SMSInbox from "../pages/SMS/SMSInbox"
import SMSSentbox from "../pages/SMS/SMSSentbox"

// Temrs And Conditions
import CollectPersonalInfo from "../pages/TermsAndConditions/CollectPersonalInfo"
import ReceivePromotion from "../pages/TermsAndConditions/ReceivePromotion"
import UseGgabi from "../pages/TermsAndConditions/UseGgabi"

// Profile
import UserProfile from "../pages/Authentication/user-profile"


const userRoutes = [

  // Calendar
  { path: "/calendar/year", component: CalendarYear },
  { path: "/calendar/month", component: CalendarMonth },
  { path: "/calendar/week", component: CalendarWeek },
  { path: "/calendar/day", component: CalendarDay },
    { path: "/calendar/template", component: CalendarTemplate },

  // Contacts
  { path: "/contacts/fixed", component: ContactFixed},
  { path: "/contacts/personal", component: ContactPersonal},
    { path: "/contacts-list/template", component: ContactsListTemplate },
    { path: "/contacts-profile/template", component: ContactsProfile },

  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // Diligence And Negligence
  { path: "/attendance", component: AttendanceCheck },

  //Email
  { path: "/email/category-ad", component: EmailCategoryAd },
  { path: "/email/category-social", component: EmailCategorySocial },
  { path: "/email/category-spam", component: EmailCategorySpam },
  { path: "/email/from-me-to-me-box", component: EmailFromToMebox },
  { path: "/email/importantbox", component: EmailImportantbox },
  { path: "/email/inbox", component: EmailInbox },
  { path: "/email/inbox/:id", component: EmailInboxRead },
  { path: "/email/reservationbox", component: EmailReservationbox },
  { path: "/email/sentbox", component: EmailSentbox },
  { path: "/email/sentbox/:id", component: EmailSentboxRead },
  { path: "/email/temporarybox", component: EmailTemporarybox },
  { path: "/email/trashbox", component: EmailTrashbox },
  { path: "/email", component: EmailWholebox },

  // Email Approval
  { path: "/email/approval/endbox", component: EmailApprovalbox },
  { path: "/email/approval/rejectbox", component: EmailApprovalbox },
  { path: "/email/approval/requestbox", component: EmailApprovalbox },
  { path: "/email/approval/waitbox", component: EmailApprovalbox },
  { path: "/email/approval/endbox/:id", component: EndApprovalRead },
  { path: "/email/approval/rejectbox/:id", component: RejectApprovalRead },
  { path: "/email/approval/requestbox/:id", component: RequestApprovalRead },
  { path: "/email/approval/waitbox/:id", component: WaitApprovalRead },

  // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },

  // Notice
  { path: "/notice/list/all", component: AllPostsList },
  { path: "/notice/list/:title", component: BoardPostsList },
  { path: "/notice/list/:title/:id", component: ReadPost },
  { path: "/notice/write", component: WritePost },

  // Setting    
  { path: "/setting/change-passwd", component: ChangePasswd },
  { path: "/setting/change-personal-info", component: ChangePersonalInfo },
  { path: "/setting/withdrawal", component: WithdrawMembership },
  { path: "/setting", component: Setting },
  
  // SMS
  { path: "/SMS/inbox", component: SMSInbox },
  { path: "/SMS/sentbox", component: SMSSentbox },
    
  // Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

    // Profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/email/inbox" /> },
  // { path: "/dashboard", exact: true, component: () => <Redirect to="/email/inbox" /> },
]

const authRoutes = [

  { path: "/auth/logout", component: Logout },
  { path: "/auth/login", component: Login },
  { path: "/auth/find-passwd", component: ForgetPwd },
  { path: "/auth/signup", component: Signup },
  
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

    // Authentication Inner
    { path: "/pages-login", component: Login1 },
    { path: "/pages-register", component: Register1 },
    { path: "/page-recoverpw", component: Recoverpw },
    { path: "/auth-lock-screen", component: LockScreen },

  //// public page
  // Terms And Conditions
  { path: "/terms-and-conditions/collect", component: CollectPersonalInfo },
  { path: "/terms-and-conditions/receive", component: ReceivePromotion },
  { path: "/terms-and-conditions/use", component: UseGgabi },
]

const adminRoutes = [
  
  // Admin
  { path: "/admin/analysis", component: Analysis},
  { path: "/admin/applicant-approval", component: ApplicantApproval },
  { path: "/admin/block-mail-server", component: BlockMailServer}, 
  { path: "/admin/employee-management", component: EmployeeManagement },
  { path: "/admin/gather-company-mails", component: GatherCompanyEmails },

]

const adminRoutesWithoutLayout = [

  { path: "/admin/gather-company-mails/:id", component: EachMailAnalysis },

]


export { userRoutes, authRoutes, adminRoutes, adminRoutesWithoutLayout }