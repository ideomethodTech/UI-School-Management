# Search Components

This folder contains reusable search components for the dashboard sections.

## Components

### 1. SearchBar
A reusable search input component with consistent styling.

**Usage:**
```javascript
import { SearchBar } from '@/app/dashboard/Search';

<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search..."
  className="w-64"
/>
```

**Props:**
- `value` (string): Current search term
- `onChange` (function): Callback function when search term changes
- `placeholder` (string, optional): Placeholder text. Default: "Search..."
- `className` (string, optional): Additional CSS classes

### 2. useSearch Hook
A custom hook that provides search functionality.

**Usage:**
```javascript
import { useSearch } from '@/app/dashboard/Search';

const { searchTerm, setSearchTerm, filteredData } = useSearch(
  data,
  ['name', 'email', 'id'] // keys to search in
);
```

**Parameters:**
- `data` (Array): Array of data to search through
- `searchKeys` (Array): Array of keys to search in each data object

**Returns:**
- `searchTerm` (string): Current search term
- `setSearchTerm` (function): Function to update search term
- `filteredData` (Array): Filtered data based on search term

**Features:**
- Case-insensitive search
- Supports nested properties (e.g., 'user.name')
- Handles arrays (searches within array items)
- Optimized with useMemo for performance

### 3. SearchableTable
A wrapper component that combines search bar, add button, and table layout.

**Usage:**
```javascript
import { SearchableTable } from '@/app/dashboard/Search';

<SearchableTable
  title="All Students"
  data={students}
  searchKeys={['name', 'id', 'email']}
  searchPlaceholder="Search students..."
  onAdd={() => openModal()}
>
  {(filteredData) => (
    <StudentTable data={filteredData} />
  )}
</SearchableTable>
```

**Props:**
- `title` (string): Section title
- `data` (Array): Data to display and search
- `searchKeys` (Array): Keys to search in the data
- `searchPlaceholder` (string, optional): Placeholder for search input
- `onAdd` (function, optional): Callback for add button
- `children` (function or ReactNode): Content to render. If function, receives `filteredData` as argument

## Examples

### Example 1: Simple Search Bar with Custom Hook
```javascript
import { SearchBar, useSearch } from '@/app/dashboard/Search';

function MyComponent() {
  const [data, setData] = useState([...]);
  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    data,
    ['name', 'email']
  );

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search users..."
      />
      <UserList users={filteredData} />
    </div>
  );
}
```

### Example 2: Using SearchableTable
```javascript
import { SearchableTable } from '@/app/dashboard/Search';

function LessonsPage() {
  const [lessons, setLessons] = useState([...]);

  return (
    <SearchableTable
      title="All Lessons"
      data={lessons}
      searchKeys={['subjectName', 'class', 'teacher']}
      searchPlaceholder="Search lessons..."
      onAdd={() => openCreateModal()}
    >
      {(filteredData) => (
        <LessonsTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </SearchableTable>
  );
}
```

## Benefits

1. **Consistency**: All search components have the same look and feel
2. **Reusability**: Use across all dashboard sections
3. **Maintainability**: Update search functionality in one place
4. **Performance**: Built-in optimization with useMemo
5. **Flexibility**: Support for various data structures and search patterns
