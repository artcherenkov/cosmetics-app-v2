import { renameKeysSnakeToCamel } from '../utils';
import moment from 'moment';

const extractDate = (eventList) => moment(eventList[0].time).format(`YYYY-MM-DD`);
const adaptServicesListToClient = (event) => {
  const { services } = event;
  return services.reduce((acc, service) => {
    const { id, cost, title } = service;
    acc = [...acc, {
      serviceId: id,
      cost,
      title,
    }];
    return acc;
  }, []);
};
const adaptEventListToClient = (processedRegs) => {
  const { eventList } = processedRegs;
  return eventList.reduce((acc, event) => {
    const { client, recordId, cost, seanceLength, time } = event;
    acc = [...acc, {
      registrationId: recordId,
      clientName: client.name,
      cost,
      duration: seanceLength / 60,
      time,
      services: adaptServicesListToClient(event),
    }];
    return acc;
  }, []);
};

export const adaptRegsToClient = (parsedRegs) => {
  const renamedRegs = renameKeysSnakeToCamel(parsedRegs);
  return { [extractDate(renamedRegs.eventList)]: { ...renamedRegs, eventList: adaptEventListToClient(renamedRegs) } };
};
