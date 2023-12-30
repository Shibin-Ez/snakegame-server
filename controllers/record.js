import pool from "../pool.js";

// CREATE
export const createRecord = async (req, res) => {
  try {
    const { name, score, time } = req.body;

    if (name == "") {
        res.status(400).send("request should have a Name");
        return;
    }

    const [newRecord] = await pool.query(
      "INSERT INTO records (name, score, time) VALUES (?, ?, ?)",
      [name, score, time]
    );

    const rank = await findRank(score);
    const userId = newRecord.insertId;

    res.status(201).json({ name, userId, rank });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something broke!");
  }
};

// READ
const findRank = async (score) => {
  try {
    const [records] = await pool.query(
      "SELECT * FROM records ORDER BY score DESC, time ASC"
    );
    const rank = records.findIndex((record) => record.score === score);
    if (rank === -1) return records.length;
    return rank + 1;
  } catch (err) {
    console.log(err);
  }
};

export const getRecords = async (req, res) => {
  try {
    const [records] = await pool.query(
      "SELECT * FROM records ORDER BY score DESC, time ASC"
    );
    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something broke!");
  }
};

// UPDATE
export const updateRecord = async (req, res) => {
  try {
    const { score, time } = req.body;
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT score, time FROM records WHERE id = ?",
      [id]
    );

    let isNewRecord = false;

    if (
      score > rows[0].score ||
      (score == rows[0].score && time > rows[0].time)
    ) {
      const [updatedRecord] = await pool.query(
        "UPDATE records SET score = ?, time = ? WHERE id = ?",
        [score, time, id]
      );
      isNewRecord = true;
    }

    const rank = await findRank(score);

    res.status(200).json({ rank, isNewRecord });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something broke!");
  }
};
