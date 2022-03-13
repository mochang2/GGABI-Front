import React from "react"

// design
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

const menuStyle = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
    },
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
    }
};

const imgStyle = {
    width: '20px',
    height: '20px',
    paddingRight: '10px',
};

const occurenceTimeStyle = {
    fontSize: '10px',
}

const AlarmDropdown = (props) => {

    // TODO: fetch new alarm from DB
    // check if the users checked the alarm(send query)

    return (
        <>
        <Menu
            anchorEl={props.anchorAlarm}
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            PaperProps={{
                elevation: 0,
                sx: {menuStyle},
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Divider />

            <MenuItem>
                <div className="groupware-favicon-in-alarm">
                    <img src={process.env.PUBLIC_URL + "/favicons/fa-envelope.png"}
                    alt="알람 이미지" style={imgStyle} />
                </div>
                <div className="contents-in-alarm">
                    <div className="contents-details-in-alarm">
                        <span>새로운 알람이 발생했습니다.</span>
                    </div>
                    <div className="occurence-time-of-alarm"
                    style={occurenceTimeStyle}>
                        <span>1시간 전</span>
                    </div>
                </div>
            </MenuItem>

            <Divider />

            <MenuItem>
                <div className="groupware-favicon-in-alarm">
                    <img src={process.env.PUBLIC_URL + "/favicons/fa-envelope.png"}
                    alt="알람 이미지" style={imgStyle} />
                </div>
                <div className="contents-in-alarm">
                    <div className="contents-details-in-alarm">
                        <span>새로운 일정이 발생했습니다.</span>
                    </div>
                    <div className="occurence-time-of-alarm"
                    style={occurenceTimeStyle}>
                        <span>2시간 전</span>
                    </div>
                </div>
            </MenuItem>

            <Divider />
        </Menu>
        </>
    )
}

export default AlarmDropdown
