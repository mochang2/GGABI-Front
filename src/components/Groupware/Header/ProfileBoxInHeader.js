import React, { useState } from "react"

// dropdown component
import AlarmDropdown from "./AlarmDropdown"
import AccountMenuDropdown from "./AccountMenuDropdown"

// design
import "./profileBoxInHeader.css"
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const ProfileBoxInHeader = (props) => {
    // alarm dropdown
    //// TODO: 알람 누르면 알람 드롭다운 나오기
    const [anchorAlarm, setAnchorAlarm] = useState(null);
    const alarmOpen = Boolean(anchorAlarm);
    const handleAlarmClick = (event) => {
        setAnchorAlarm(event.currentTarget);
    };
    const handleAlarmClose = () => {
        setAnchorAlarm(null);
    };

    // profile dropdown
    //// TODO <Avatar> 태그 안에 있는 것은 유저의 성(user.name) fetch해서 넣기
    const [anchorAccount, setAnchorAccount] = useState(null);
    const accountOpen = Boolean(anchorAccount);
    const handleAccountClick = (event) => {
        setAnchorAccount(event.currentTarget);
    };
    const handleAccountClose = () => {
        setAnchorAccount(null);
    };

    return (
        <div className="profilebox-wrapper">
            <div className="profilebox-placer">
                <div className="alarm-wrapper profile-related-pic-wrapper"
                onClick={handleAlarmClick}>
                    <img src={process.env.PUBLIC_URL + "/favicons/fa-bell.png"}
                    alt="알람 이미지" className="favicon-png" />
                </div>
                <AlarmDropdown anchorAlarm={anchorAlarm} open={alarmOpen}
                handleClick={handleAlarmClick} handleClose={handleAlarmClose} />

                <IconButton size="small" sx={{ ml: 2, marginRight: '40px' }}
                 onClick={handleAccountClick}>
                    <Avatar sx={{ width: 28, height: 28 }}>이</Avatar>
                </IconButton>
                <AccountMenuDropdown anchorAccount={anchorAccount} open={accountOpen}
                handleClick={handleAccountClick} handleClose={handleAccountClose} />
            </div>
        </div>
    )
}

export default ProfileBoxInHeader