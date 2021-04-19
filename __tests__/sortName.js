import { mostVotedName, lessVotedName } from '../src/helpers/sortName';
import { tmpData } from '../helpers/tmpData';
test('Most Voted Name (Z -> A)  Sort', () => {
  mostVotedName(tmpData);
  expect(tmpData).toBeSortedBy('name', {
    descending: true,
  });
});
test('Less Voted Name (A -> Z)  Sort', () => {
  lessVotedName(tmpData);
  expect(tmpData).toBeSortedBy('name', {
    descending: false,
  });
});
