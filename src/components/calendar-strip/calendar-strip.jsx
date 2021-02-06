import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import moment from 'moment';

import styles from './styles';
import DayNumber from './components/day-number/day-number';

const BASIC_SETUP = {
  begin: moment(`2020-01-01`),
  end: moment(`2022-03-01`),
};

const fillDaysArray = ({ begin, end }) => {
  const duration = moment.duration(end.diff(begin)).asDays();
  const days = [];
  for (let i = 0; i <= duration; i++) {
    const date = moment(begin).add(i, `d`).toISOString();
    days.push({
      key: date,
      date,
    });
  }

  return days;
};
const getMonths = (calStripLeft) => {
  const from = moment(calStripLeft);
  const to = moment(calStripLeft).add(6, `d`);
  if (moment(from).month() === moment(to).month()) {
    return moment(from).format(`MMMM, yyyy`);
  }

  return moment(from).format(`MMMM`) + ` / ` + moment(to).format(`MMMM, yyyy`);
};
const getWeekStartIndex = (date, { begin }) => {
  const index = moment.duration(moment(date).startOf(`week`).diff(begin)).asDays();
  if (index < 0) {
    return 0;
  }
  return index;
};
const getDayNumberSize = () => (Dimensions.get(`window`).width - 60) / 7;

const CalendarStrip = ({ style }) => {
  const [activeDate, setActiveDate] = useState(moment().toISOString());
  const [calStripLeft, setCalStripLeft] = useState(moment(activeDate).startOf(`week`).toISOString());

  const listRef = useRef(null);
  const days = fillDaysArray(BASIC_SETUP);
  const size = getDayNumberSize();
  const componentSetup = { ...BASIC_SETUP, days, size };

  const initialScrollIndex = getWeekStartIndex(calStripLeft, componentSetup);

  useEffect(() => {
    listRef.current.scrollToIndex({ index: getWeekStartIndex(calStripLeft, componentSetup) });
  }, [calStripLeft]);

  const scrollRight = () => {
    setCalStripLeft(moment(calStripLeft).add(7, `d`).startOf(`week`).toISOString());
  };
  const scrollLeft = () => {
    let date = moment(calStripLeft).subtract(7, `d`).startOf(`week`).toISOString();
    if (moment(date).isBefore(componentSetup.begin)) {
      date = componentSetup.begin;
    }
    setCalStripLeft(date);
  };

  const renderItem = ({ item }) => {
    return (
      <DayNumber date={item.date} size={size} activeDate={activeDate} setActiveDate={setActiveDate} />
    );
  };
  const getItemLayout = ({ size }) => {
    return (data, index) => ({ length: size, offset: size * index, index });
  };

  return (
    <View style={[{ ...style }, styles.container]}>
      <View style={styles.listContainer}>
        <GestureRecognizer
          onSwipeLeft={scrollRight}
          onSwipeRight={scrollLeft}
        >
          <FlatList
            ref={listRef}
            scrollEnabled={false}
            style={[styles.list, { width: Dimensions.get(`window`).width - 60 }]}
            horizontal={true}
            data={days}
            renderItem={renderItem}
            getItemLayout={getItemLayout(componentSetup)}
            initialNumToRender={10}
            initialScrollIndex={initialScrollIndex}
          />
        </GestureRecognizer>
      </View>
      <Text style={styles.month}>{getMonths(calStripLeft)}</Text>
    </View>
  );
};

CalendarStrip.propTypes = {
  style: PropTypes.object,
};

export default CalendarStrip;
