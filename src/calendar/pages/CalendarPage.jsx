/* eslint-disable no-unused-vars */
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { UseCalendarStore } from "../../hooks/useCalendarStore";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const [lastview, setLastview] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const { events, setActiveEvent, startLoadingEvents } = UseCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (e) => {
    // console.log({ doubleClick: e });
    openDateModal();
  };

  const onSelect = (e) => {
    console.log({ click: e });
    setActiveEvent(e);
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
    setLastview(e);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastview}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
