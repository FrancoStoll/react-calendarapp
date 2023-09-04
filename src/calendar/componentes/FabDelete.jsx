
import { useUiStore } from "../../hooks/useUiStore";
import { UseCalendarStore } from "../../hooks/useCalendarStore";


export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = UseCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
    
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}
    style={{display: hasEventSelected ? '' : 'none'}}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
