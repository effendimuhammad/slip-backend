import db from "../config/db.js";

export const loginModel = (nim) => {
  const SQLQuery = `SELECT [id]
                        ,[username]
                        ,[nim]
                        ,[password]
                        ,[email]
                        ,[createdAt]
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                    WHERE nim = '${nim}'`;
  return db.query(SQLQuery);
};

export const loginModelNav = (id) => {
  const SQLQuery = `SELECT [id]
                        ,[username]
                        ,[nim]    
                    FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                    WHERE id = '${id}'`;
  return db.query(SQLQuery);
};
