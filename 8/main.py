from collections import defaultdict
from itertools import product

mat = []
with open('input', 'r') as f:
    mat = f.read().splitlines()

rows, cols = len(mat), len(mat[0])
print(f'read file with {rows} rows and {cols} cols')

def in_range(x,y):
    return 0 <= x < rows and 0 <= y < cols

antennas = defaultdict(set)

for x,y in product(range(rows), range(cols)):
    if mat[x][y] != '.':
        antennas[mat[x][y]].add((x,y))
 
def find_unique_antinodes_positions(include_resonance_harmonics=False):
    antinodes_positions = set()
    for positions in antennas.values():
        positions = list(positions)
        for i, pos in enumerate(positions):
            for other_pos in positions[i+1:]:
                    x_diff, y_diff = pos[0] - other_pos[0], pos[1] - other_pos[1]
                    locs = [(pos[0] + x_diff, pos[1] + y_diff), (other_pos[0] - x_diff, other_pos[1] - y_diff)]

                    if include_resonance_harmonics:
                        antinodes_positions.add(pos)
                        antinodes_positions.add(other_pos)
                        pos1_ext, pos2_ext = locs[0], locs[1]
                        while in_range(pos1_ext[0], pos1_ext[1]) or in_range(pos2_ext[0], pos2_ext[1]):
                            pos1_ext = (pos1_ext[0] + x_diff, pos1_ext[1] + y_diff)
                            pos2_ext = (pos2_ext[0] - x_diff, pos2_ext[1] - y_diff)
                            locs.extend([pos1_ext, pos2_ext])
                            
                    antinodes_positions.update(loc for loc in locs if in_range(loc[0], loc[1]))
           
    return len(antinodes_positions)

print('solution 1:', find_unique_antinodes_positions())
print('solution 2:', find_unique_antinodes_positions(True))

