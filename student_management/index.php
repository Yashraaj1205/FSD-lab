<?php
require_once 'config/db.php';

// Handle Delete logic
if (isset($_GET['delete'])) {
    $roll_no = $_GET['delete'];
    $stmt = $conn->prepare("DELETE FROM students WHERE roll_no = ?");
    $stmt->bind_param("s", $roll_no);
    $stmt->execute();
    header("Location: index.php?msg=deleted");
    exit();
}

$search = isset($_GET['search']) ? $_GET['search'] : '';
$sql = "SELECT * FROM students WHERE roll_no LIKE ? OR first_name LIKE ? OR last_name LIKE ?";
$stmt = $conn->prepare($sql);
$search_param = "%$search%";
$stmt->bind_param("sss", $search_param, $search_param, $search_param);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Directory | LendFlow</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #121212;
            --card-bg: #1e1e1e;
            --accent-color: #4f46e5;
            --text-color: #e5e7eb;
            --row-hover: #2a2a2a;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 2rem;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }

        h1 { font-weight: 600; color: #fff; margin: 0; }

        .btn {
            padding: 0.6rem 1.2rem;
            background-color: var(--accent-color);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            transition: background 0.3s;
            border: none;
            cursor: pointer;
        }

        .btn-danger { background-color: #ef4444; }
        .btn-secondary { background-color: #4b5563; }

        .search-box {
            background: var(--card-bg);
            padding: 1rem;
            border-radius: 0.8rem;
            margin-bottom: 1.5rem;
            border: 1px solid #333;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            gap: 1rem;
        }

        .search-box input {
            flex-grow: 1;
            background: #2a2a2a;
            border: 1px solid #444;
            padding: 0.6rem;
            border-radius: 0.4rem;
            color: #fff;
        }

        .table-container {
            background: var(--card-bg);
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid #333;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th {
            background: #252525;
            padding: 1rem;
            color: #9ca3af;
            font-weight: 400;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        td {
            padding: 1rem;
            border-bottom: 1px solid #333;
            font-size: 0.95rem;
        }

        tr:hover { background: var(--row-hover); }

        .actions { display: flex; gap: 0.5rem; }

        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            background: #333;
            color: #ccc;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Student Records</h1>
        <a href="register.php" class="btn">+ New Registration</a>
    </div>

    <form class="search-box" method="GET">
        <input type="text" name="search" placeholder="Search by name or Roll No..." value="<?php echo htmlspecialchars($search); ?>">
        <button type="submit" class="btn">Search</button>
        <?php if($search): ?>
            <a href="index.php" class="btn btn-secondary">Clear</a>
        <?php endif; ?>
    </form>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Roll No</th>
                    <th>Contact</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result->num_rows > 0): ?>
                    <?php while($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['first_name']); ?></td>
                            <td><?php echo htmlspecialchars($row['last_name']); ?></td>
                            <td><span class="badge"><?php echo htmlspecialchars($row['roll_no']); ?></span></td>
                            <td><?php echo htmlspecialchars($row['contact_number']); ?></td>
                            <td class="actions">
                                <a href="edit.php?roll_no=<?php echo $row['roll_no']; ?>" class="btn btn-secondary">Edit</a>
                                <a href="index.php?delete=<?php echo $row['roll_no']; ?>" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</a>
                                <a href="generate_report.php?roll_no=<?php echo $row['roll_no']; ?>" class="btn" style="background:#10b981">PDF</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5" style="text-align: center; color: #6b7280;">No records found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
