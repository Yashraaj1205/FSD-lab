<?php
require_once 'config/db.php';

$roll_no = isset($_GET['roll_no']) ? $_GET['roll_no'] : '';
$student = null;

if ($roll_no) {
    $stmt = $conn->prepare("SELECT * FROM students WHERE roll_no = ?");
    $stmt->bind_param("s", $roll_no);
    $stmt->execute();
    $student = $stmt->get_result()->fetch_assoc();
}

$message = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $contact_number = $_POST['contact_number'];
    $target_roll = $_POST['roll_no'];

    $sql = "UPDATE students SET first_name=?, last_name=?, contact_number=? WHERE roll_no=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $first_name, $last_name, $contact_number, $target_roll);

    if ($stmt->execute()) {
        header("Location: index.php?msg=updated");
        exit();
    } else {
        $message = "<div class='alert alert-danger'>Error: " . $stmt->error . "</div>";
    }
}

if (!$student) {
    die("Student not found.");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Student | LendFlow</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #121212;
            --card-bg: #1e1e1e;
            --accent-color: #4f46e5;
            --text-color: #e5e7eb;
            --input-bg: #2a2a2a;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .container {
            background-color: var(--card-bg);
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            width: 100%;
            max-width: 500px;
            border: 1px solid #333;
        }

        h2 { text-align: center; margin-bottom: 2rem; color: #fff; }

        .form-group { margin-bottom: 1.2rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: #9ca3af; }
        input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid #444;
            background-color: var(--input-bg);
            color: #fff;
            box-sizing: border-box;
        }

        .btn {
            width: 100%;
            padding: 0.8rem;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
        }

        .links { text-align: center; margin-top: 1.5rem; }
        .links a { color: var(--accent-color); text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Update Student Details</h2>
        <?php echo $message; ?>
        <form method="POST">
            <input type="hidden" name="roll_no" value="<?php echo htmlspecialchars($student['roll_no']); ?>">
            
            <div class="form-group">
                <label>Roll No (Read Only)</label>
                <input type="text" value="<?php echo htmlspecialchars($student['roll_no']); ?>" disabled>
            </div>
            
            <div class="form-group">
                <label>First Name</label>
                <input type="text" name="first_name" value="<?php echo htmlspecialchars($student['first_name']); ?>" required>
            </div>
            
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" name="last_name" value="<?php echo htmlspecialchars($student['last_name']); ?>" required>
            </div>
            
            <div class="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact_number" value="<?php echo htmlspecialchars($student['contact_number']); ?>" required>
            </div>
            
            <button type="submit" class="btn">Update Information</button>
        </form>
        <div class="links">
            <a href="index.php">Back to List</a>
        </div>
    </div>
</body>
</html>
