import { Link } from "react-router-dom";
import "./chatList.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ChatList = () => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (chatId) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    onSuccess: () => {
      // Invalidate and refetch the chats list
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
    },
  });

  const handleDelete = (e, chatId) => {
    e.preventDefault(); // Prevent navigation
    deleteMutation.mutate(chatId);
  };

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <hr />
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore NOVA AI</Link>
      <Link to="/">Contact</Link>
      <span className="title">RECENT CHATS</span>
      <hr />  
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <div className="chatItem" key={chat._id}>
                <Link to={`/dashboard/chats/${chat._id}`}>{chat.title}</Link>
                <button
                  className="deleteBtn"
                  onClick={(e) => handleDelete(e, chat._id)}
                >
                  <img src="/delete.png" alt="delete" />
                </button>
              </div>
            ))}
      </div>
      <div className="upgrade">
        <img src="/logo-nova.png" alt="" />
        <div className="texts">
          <span>Upgrade to NOVA AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
