
<v-flex ma-2>
	<v-card>
		<v-card-title>
			<div id="chat-container">
				<span class="title">Chat Room</span>
				<v-divider></v-divider>
				<v-text-field label="Message" height="auto" v-model="newMessage"></v-text-field>
			</div>
		</v-card-title>
		<v-card-actions>
			<v-layout align-end justify-end row fill-height>
				<v-btn flat color="accent" v-on:click="send">Send</v-btn>
			</v-layout>
		</v-card-actions>
	</v-card>
</v-flex>
