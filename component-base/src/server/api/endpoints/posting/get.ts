import $ from 'cafy';
import { define, AuthScopes, ApiErrorSources } from '../../endpoints';
import { ObjectIdContext } from '../../misc/cafyValidators';
import { PostingResponseObject } from '../../response/responseObjects';

export default define({
	params: {
		postingId: $.type(ObjectIdContext)
	},
	scopes: [AuthScopes.postingRead]
}, async (manager) => {

	// params
	const postingId: string = manager.params.postingId;

	const chatPostingDoc = await manager.postingService.findByChatId(postingId);
	if (!chatPostingDoc) {
		manager.error(ApiErrorSources.postingNotFound);
		return;
	}

	await chatPostingDoc.populate(manager.db);
	const chatPosting = await chatPostingDoc.pack(manager.db);

	manager.success(new PostingResponseObject(chatPosting));
});