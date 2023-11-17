import {
  Agenda,
  Day,
  EventSettingsModel,
  FieldModel,
  Inject,
  Month,
  PopupOpenEventArgs,
  ScheduleComponent,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Session,
  UMApplicationSessionQueriesGetAllGetAllDto,
} from '../../shared/api';
import './Event.css';

const fieldsData: FieldModel = {
  subject: { name: 'courseClassName', title: 'Class' },
  startTime: { name: 'startAt' },
  endTime: { name: 'endAt' },
};

const EditorFooterTemplate = () => {
  return <></>;
};

const Event = () => {
  const scheduleObj = useRef<ScheduleComponent | null>(null);
  const user = useSelector((store: RootState) => store.auth.user);
  const [sessions, setSessions] = useState<
    UMApplicationSessionQueriesGetAllGetAllDto[]
  >([]);
  const [eventSettings, setEventSettings] = useState<EventSettingsModel>({});

  const getSessions = async () => {
    const res = await new Session().getSession({});
    if (res.data.data) {
      setSessions(
        res.data.data.map((x) => ({
          ...x,
          courseClassName: x.courseClass?.name,
        }))
      );
    }
  };

  const onPopupOpen = (args: PopupOpenEventArgs) => {
    // let isEmptyCell =
    //   !args.target ||
    //   args.target.classList.contains('e-work-cells') ||
    //   args.target.classList.contains('e-header-cells'); // checking whether the cell is empty or not
    // if ((args.type === 'QuickInfo' || args.type === 'Editor') && isEmptyCell) {
    //   args.cancel = true;
    // }
  };

  useEffect(() => {
    if (user) getSessions();
  }, [user]);

  useEffect(() => {
    setEventSettings({
      dataSource: sessions,
      fields: fieldsData,
      allowAdding: false,
      allowEditing: false,
      allowDeleting: false,
    });
  }, [sessions]);

  return (
    <ScheduleComponent
      ref={scheduleObj}
      eventSettings={eventSettings}
      editorFooterTemplate={EditorFooterTemplate}
      popupOpen={onPopupOpen}
      height='100%'
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Event;
