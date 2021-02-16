import { renameKeysSnakeToCamel } from '../utils';
import moment from 'moment';

const extractDate = (event) => moment(event.time).format(`YYYY-MM-DD`);
const adaptServicesListToClient = (event) => {
  const { services } = event;
  return services.reduce((acc, service) => {
    const { id, cost, title } = service;
    acc = [...acc, { id, cost, title }];
    return acc;
  }, []);
};
const adaptEventToClient = (event) => {
  const { client, recordId, cost, seanceLength, time } = event;
  return {
    id: recordId,
    clientName: client.name,
    cost,
    duration: seanceLength / 60,
    time,
    services: adaptServicesListToClient(event),
  };
};

export const adaptRegsToClient = (parsedRegs) => {
  const renamedRegs = renameKeysSnakeToCamel(parsedRegs);

  return renamedRegs.eventList.reduce((acc, item) => {
    const adaptedItem = adaptEventToClient(item);
    const date = extractDate(adaptedItem);

    const currentEventList = acc[date] ? acc[date].eventList : [];
    const currentCost = acc[date] ? acc[date].fullCost : 0;

    const eventList = [...currentEventList, adaptedItem];
    const fullCost = currentCost + adaptedItem.cost;

    acc = { ...acc, [date]: { eventList, fullCost, regsCount: eventList.length } };
    return acc;
  }, {});
};
