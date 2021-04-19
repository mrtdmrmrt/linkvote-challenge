import { sortPoint } from '../src/helpers/sortPoint';
import { tmpData } from '../helpers/tmpData';
test('Point  Sort', () => {
  sortPoint(tmpData);
  expect(tmpData).toBeSortedBy('points', {
    descending: true,
  });
});
