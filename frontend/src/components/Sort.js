import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Sort(props) {
  const [anchorEl, setAnchorEl] = useState(undefined);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleMenuItemClick = (event, index) => {
    props.setSelectedIndex(index);
    handleClose();
  };

  return (
    <span>
      <IconButton
        onClick={handleClick}
      >
        <FilterAltIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === props.selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}
