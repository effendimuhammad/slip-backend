import db from "../config/db.js";

export const getUserModels = () => {
  const SQLQuery = `SELECT [id]
                          ,[username]
                          ,[nim]
                          ,[password] 
                          ,[email]
                          ,[createdAt]
                      FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]`;
  return db.query(SQLQuery);
};

export const getUserUpdateModels = (id) => {
  const SQLQuery = `SELECT [id]
                          ,[username]
                          ,[nim]
                          ,[password] 
                          ,[email]
                          ,[createdAt]
                      FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                      WHERE id = ${id}`;
  return db.query(SQLQuery);
};

export const updateUserUpdateModels = (body, id) => {
  const SQLQuery = `UPDATE [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                    SET [username]  = '${body.username}',
                        [nim]       = '${body.nim}',
                        [email]     = '${body.email}',
                        [createdAt] =  CURRENT_TIMESTAMP
                    WHERE id = ${id}`;
  return db.query(SQLQuery);
};

export const createUserModels = (username, nim, password, email) => {
  const SQLQuery = `INSERT INTO [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                        ([username]
                        ,[nim]
                        ,[password]
                        ,[email]
                        ,[createdAt])
                    VALUES
                        ('${username}'
                        ,'${nim}'
                        ,'${password}'
                        ,'${email}'
                        ,CURRENT_TIMESTAMP)`;
  return db.query(SQLQuery);
};

export const deleteUserModels = (id) => {
  const SQLQuery = `DELETE FROM [DX_EXPENSE_PART].[dbo].[EXPENSE_M_USERS]
                    WHERE id = ${id}`;
  return db.query(SQLQuery);
};
