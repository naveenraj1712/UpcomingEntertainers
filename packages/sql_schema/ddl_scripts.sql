-- Create a new table called '[users]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[users]', 'U') IS NOT NULL
DROP TABLE [dbo].[users]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[users]
(
    [user_id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [user_name] NVARCHAR(50) NULL,
    [user_email] NVARCHAR(50) NOT NULL,
    [password] NVARCHAR(50) NOT NULL,
    [first_name] NVARCHAR(50) NULL,
    [last_name] NVARCHAR(50) NULL,
    [mobile_no] INT NOT NULL,
    -- Specify more columns here
);
GO