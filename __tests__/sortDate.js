import { sortDate } from '../src/helpers/sortDate';
import { tmpData } from '../helpers/tmpData';
test('Date  Sort', () => {
  sortDate(tmpData);
  expect(tmpData).toBeSortedBy('date', {
    descending: false,
  });
});
