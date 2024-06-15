import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import FeedIcon from '@mui/icons-material/Feed';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HotelIcon from '@mui/icons-material/Hotel';
import MedicationIcon from '@mui/icons-material/Medication';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { Link } from 'react-router-dom';

const styles = {
  textDecoration: "none",
  color: "inherit"
};

const listItemButtonStyles = {
  '&:hover': {
    backgroundColor: '#800080', // Purple color
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: '#fff',
    },
  },
};

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="/book-appointment" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Book Appointment" />
      </ListItemButton>
    </Link>

        <Link to="/dashboard/patient-appointment" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <ChecklistRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="List of Patient Appointment" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/forms" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Forms" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/patientlist" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <AccessibleForwardIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Lists" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/patient-alloc" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <HotelIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Allocation" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/staff-alloc" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <MedicationIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Allocation" />
      </ListItemButton>
    </Link>

    <Link to="/stafflist" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Lists" />
      </ListItemButton>
    </Link>

    <Link to="/create_staff" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Staff" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/settings" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/about" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);
