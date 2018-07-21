<style scoped>

#chat-container {
    width: 100%;
}

#message_box_container {
    width: 100%;
    margin: 0px;
}

#textfield-adjustment {
    margin-top: 20px;
}

</style>

<template>

<div v-if="isLoggedIn">
    <v-flex ma-2 v-for="message in messages">
        <v-card v-if="isLoggedIn">
            <v-card-title>
                {{message.message}}
            </v-card-title>
        </v-card>
    </v-flex>

    <v-flex ma-2>
        <v-card>
            <v-card-title>
                <div id="chat-container">
                    <span class="title">Chat Room</span>
                    <v-divider></v-divider>
                    <v-text-field label="Message" height="auto" v-model="newMessage"></v-text-field>
                </div>
            </v-card-title>
            <v-card-actions id="chat_box">
                <v-layout align-end justify-end row fill-height>
                    <v-btn flat color="accent" v-on:click="send">Send</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</div>

<v-flex ma-2 v-else>
    <v-card>
        <v-card-title>
            <div id="login-container">
                <span class="title">Sign in Here</span>
                <v-text-field label="User Name" height="auto" v-model="userName"></v-text-field>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-layout align-end justify-end row fill-height>
                <v-btn flat color="accent" v-on:click="signIn">Sign in</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>

</v-flex>

</template>

<script>

import io from 'socket.io-client';

export default {
    name: 'ChatView',

    data() {
        return {
            newMessage: null,
            messages: null,
            userName: null,
            isLoggedIn: false,
            socket: null
        }
    },

    methods: {
        send: function(e) {
            // Cancel Reload Page after this action.
            e.preventDefault()

            // Push Message to messages array in this view.
            if (this.newMessage != null && this.userName.length != 0) {

                // EMIT EVENT TO SERVER in order to update all device
                // in realtime.
                this.socket.emit('SEND_MESSAGE', {
                    user: this.userName,
                    message: this.newMessage
                });

                // Somehow, you need to concatenate request as following to make it work...
                var new_request = "http://127.0.0.1:5000/add_message?message=" + this.userName + ": " + this.newMessage

                // AJAX to Flask.
                this.axios
                    .post(new_request)
                    .then(function(response) {
                        console.log(response);
                    }).catch(error => {
                        console.log(error.response)
                    });

                this.newMessage = null
            }
        },

        signIn: function() {
            if (this.userName != null && this.userName.length != 0) {
                // Set Cookies.
                this.$cookies.set("user_active", "active", "5min")
                this.$cookies.set("user_name", this.userName, "5min")
                this.isLoggedIn = true
            }
        }
    },

    mounted: function() {
        // Execute this function after The LIFE CYCLE: Mounted.
        this.$nextTick(function() {
            // Get All History from server.
            this.axios
                .get("http://127.0.0.1:5000/get_history")
                .then((response) => {
                    this.messages = response.data
                })

            // Check Login Status. Not recommended checking this way.
            // Easily hacked.
            if (this.$cookies.isKey("user_active")) {
                if (this.$cookies.get("user_active") == "active") {
                    this.userName = this.$cookies.get("user_name")
                    this.isLoggedIn = true
                }
            }

            // Establishing Connection.
            this.socket = io('localhost:3001')

            // Receiving update event.
            this.socket.on('NEW_MESSAGE', (data) => {
                var sender = data.user
                var incoming_message = data.message

                var message_to_be_added = sender + ": " + incoming_message
                this.messages.push({
                    message: message_to_be_added
                });
            });
        })
    }
}

</script>
