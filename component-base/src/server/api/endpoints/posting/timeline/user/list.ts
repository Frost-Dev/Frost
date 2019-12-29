import $ from 'cafy';
import { MongoProvider } from 'frost-core';
import { define, AuthScopes, ApiErrorSources } from '../../../../endpoints';
import { ObjectIdContext } from '../../../../misc/cafyValidators';
import timeline from '../../../../misc/timeline';
import { PostingsResponseObject } from '../../../../response/responseObjects';

export default define({
	params: {
		userId: $.type(ObjectIdContext)
	},
	scopes: [AuthScopes.postingRead]
}, async (manager) => {

	// params
	const userId: string = manager.params.userId;

	const chatPostings = await timeline(manager, [MongoProvider.buildId(userId)]);

	manager.success(new PostingsResponseObject(chatPostings));
});