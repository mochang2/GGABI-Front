import React from "react"

// design
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const AccountMenuDropdown = (props) => {
    return (
        <>
        <Menu
            anchorEl={props.anchorAccount}
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
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
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Avatar />
                프로필
            </MenuItem>
            <Divider />

            <MenuItem>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
                설정
            </MenuItem>

            <MenuItem>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
                로그아웃
            </MenuItem>
        </Menu>
        </>
    )
}

export default AccountMenuDropdown