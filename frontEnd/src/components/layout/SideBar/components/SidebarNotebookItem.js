import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { NavItem, NavLink } from "shards-react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneIcon from '@material-ui/icons/Done';

const SidebarNotebookItem = props => (
  <div>
    <NavItem
      onClick={() => props.onClick(props.index)}
      active={props.selected}
    >
      <NavLink>
        <div className="flex-center" style={{ float: "left" }}>
          {props.name && <span style={{ marginRight: 10 }}>{props.name}</span>}
          {props.icon && (
            <div dangerouslySetInnerHTML={{ __html: props.icon }} />
          )}
        </div>
        <div style={{ float: "right" }}>
          <div className="flex-spaced">
            {props.default && props.selected && !props.isEditable && (
              <div >
                <EditIcon fontSize="small" className="icon-material-ui"
                  onClick={(e) => { e.stopPropagation(); props.toggleEditNotebook() }} />
              </div>
            )}

            {props.default && props.selected && props.isEditable && (
              <div style={{ marginLeft: 10 }}>
                <DoneIcon
                  onClick={(e) => { e.stopPropagation(); props.toggleEditNotebook() }}
                  style={{ color: '#35fc03' }}
                  fontSize="small"
                  className="icon-material-ui"
                />
              </div>
            )}

            {props.default && props.selected && (
              <div style={{ marginLeft: 10 }}>
                <DeleteOutlineIcon
                  onClick={(e) => { e.stopPropagation(); props.onDeleteNotebook() }}
                  fontSize="small"
                  className="icon-material-ui"
                />
              </div>

            )}
          </div>
        </div>
      </NavLink>
    </NavItem>
  </div>
);

export default SidebarNotebookItem;
/*

<div style={{ marginLeft: 10 }}>
                <DoneIcon
                  onClick={props.onSaveEdit}
                  style={{ color: '#35fc03' }}
                  fontSize="small"
                  className="icon-material-ui"
                />
              </div>

*/