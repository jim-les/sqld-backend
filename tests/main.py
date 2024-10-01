import numpy as np
import matplotlib.pyplot as plt

# Simulation of test results
np.random.seed(0)  # For reproducibility
num_tests = 10
test_names = [f'Test {i+1}' for i in range(num_tests)]

# Randomly generate test outcomes
results = {
    'Passed': np.random.randint(5, 10, size=num_tests),
    'Failed': np.random.randint(0, 5, size=num_tests),
    'Skipped': np.random.randint(0, 3, size=num_tests),
}

# Prepare data for plotting
bar_width = 0.2
index = np.arange(num_tests)

# Create a stacked bar chart
fig, ax = plt.subplots(figsize=(12, 6))

ax.bar(index, results['Passed'], bar_width, label='Passed', color='green')
ax.bar(index + bar_width, results['Failed'], bar_width, label='Failed', color='red')
ax.bar(index + 2 * bar_width, results['Skipped'], bar_width, label='Skipped', color='orange')

# Adding labels and title
ax.set_xlabel('Tests')
ax.set_ylabel('Number of Tests')
ax.set_title('Test Results Simulation')
ax.set_xticks(index + bar_width)
ax.set_xticklabels(test_names)
ax.legend()

# Adding value labels on bars
for i in range(num_tests):
    ax.text(i, results['Passed'][i] + 0.1, str(results['Passed'][i]), ha='center', color='black')
    ax.text(i + bar_width, results['Failed'][i] + 0.1, str(results['Failed'][i]), ha='center', color='black')
    ax.text(i + 2 * bar_width, results['Skipped'][i] + 0.1, str(results['Skipped'][i]), ha='center', color='black')

# Save the plot to a file
plt.tight_layout()
plt.savefig('test_results_simulation.png')  # Save as PNG
plt.close()  # Close the figure
