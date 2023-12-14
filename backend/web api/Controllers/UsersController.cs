using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using web_api.Models;

namespace web_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController

    {
        public string userFile = @"F:\project\angular\din aufgabe\backend\web api\Users.json";

        [HttpGet(Name = "GetAllUsers")]
        public List<User> GetAllUsers()
        {
            List<User> usersList = new List<User>();
            if (File.Exists("Users.json"))
            {
                usersList = JsonSerializer.Deserialize<List<User>>(File.ReadAllText(userFile));
            }
            return usersList;
        }

        ///creat new user
        [HttpPost(Name = "CreateNewUser")]
        public int CreateNewUser(User user)
        {
            List<User> usersList = new List<User>();
            if (File.Exists("Users.json"))
            {
                usersList = JsonSerializer.Deserialize<List<User>>(File.ReadAllText(userFile));
            }
            int id = 1;
            string roll = "user";
            if (usersList.Count() > 0)
            {
                id = usersList.Max((x) => x.Id) + 1;
            }
            usersList.Add(new User { Id = id, UserName = user.UserName, Password = Utils.sha256_hash(user.Password), Email = user.Email ,Roll= roll });
            File.WriteAllText(userFile, JsonSerializer.Serialize(usersList));
            return id;
        }
        ///delete user
        [HttpDelete(Name = "DeleteUser")]
        public bool DeleteUser(int id)
        {
            List<User> usersList = new List<User>();
            if (File.Exists("Users.json"))
            {
                usersList = JsonSerializer.Deserialize<List<User>>(File.ReadAllText(userFile));
            }
            usersList.Remove(usersList.Where((x) => x.Id == id).FirstOrDefault());
            File.WriteAllText(userFile, JsonSerializer.Serialize(usersList));
            return true;
        }

        /// update user
        [HttpPut(Name = "UpdateUser")]
        public bool UpdatUser(User user)
        {
            List<User> userslist = new List<User>();
            if (File.Exists("Users.json"))
            {
                userslist = JsonSerializer.Deserialize<List<User>>(File.ReadAllText(userFile));
            }
            if (userslist.Count() > 0)
            {
                var userToUpdate = userslist.Where((x) => x.Id == user.Id).First();
                userToUpdate.UserName = user.UserName;
                userToUpdate.Password = user.Password;
                userToUpdate.Email = user.Email;
                userToUpdate.Roll = user.Roll;
                File.WriteAllText(userFile, JsonSerializer.Serialize(userslist));
                return true;
            }
            return false;
        }

      
    }
}