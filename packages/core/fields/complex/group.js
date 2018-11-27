/**
 * External dependencies.
 */
import cx from 'classnames';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { getFieldType } from '../../registry/fields';

class ComplexGroup extends Component {
	/**
	 * Handles the click on the "Toggle" button.
	 *
	 * @return {void}
	 */
	handleToggleClick = () => {
		const {
			id,
			onToggle
		} = this.props;

		onToggle( id );
	}

	/**
	 * Handles the click on the "Clone" button.
	 *
	 * @return {void}
	 */
	handleCloneClick = () => {
		const {
			id,
			onClone
		} = this.props;

		onClone( id );
	}

	/**
	 * Handles the click on the "Remove" button.
	 *
	 * @return {void}
	 */
	handleRemoveClick = () => {
		const {
			id,
			onRemove
		} = this.props;

		onRemove( id );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			index,
			label,
			name,
			prefix,
			tabbed,
			hidden,
			collapsed,
			allowClone,
			fields,
			context,
			onFieldSetup
		} = this.props;

		const groupClasses = cx(
			'cf-complex__group',
			{
				'cf-complex__group--collapsed': collapsed
			}
		);

		const toggleClasses = cx(
			'dashicons-before',
			'cf-complex__group-action-icon',
			{
				'dashicons-arrow-up': ! collapsed,
				'dashicons-arrow-down': collapsed
			}
		);

		const actionsClasses = cx(
			'cf-complex__group-actions',
			{
				'cf-complex__group-actions--tabbed': tabbed
			}
		);

		return (
			<div className={ groupClasses } hidden={ hidden }>
				{ name && (
					<input
						type="hidden"
						name={ `${ prefix }[value]` }
						value={ name }
					/>
				) }

				{ ! tabbed && (
					<div className="cf-complex__group-head">
						<span className="cf-complex__group-index">
							{ index + 1 }
						</span>

						<span className="cf-complex__group-title">
							{ label }
						</span>
					</div>
				) }

				<div className="cf-complex__group-body" hidden={ collapsed }>
					{ fields.map( ( field ) => {
						const Field = getFieldType( field.type, context );

						if ( ! Field ) {
							return null;
						}

						return (
							// The `key` will be assigned via `onFieldSetup`.
							// eslint-disable-next-line react/jsx-key
							<Field { ...onFieldSetup( field, {}, this.props ) } />
						);
					} ) }
				</div>

				<div className={ actionsClasses }>
					{ allowClone && (
						<button type="button" className="cf-complex__group-action" onClick={ this.handleCloneClick }>
							<span className="dashicons-before dashicons-admin-page cf-complex__group-action-icon"></span>

							<span className="cf-complex__group-action-text">
								Duplicate
							</span>
						</button>
					) }

					<button type="button" className="cf-complex__group-action" onClick={ this.handleRemoveClick }>
						<span className="dashicons-before dashicons-trash cf-complex__group-action-icon"></span>

						<span className="cf-complex__group-action-text">
							Remove
						</span>
					</button>

					{ ! tabbed && (
						<button type="button" className="cf-complex__group-action" onClick={ this.handleToggleClick }>
							<span className={ toggleClasses }></span>

							<span className="cf-complex__group-action-text">
								Collapse
							</span>
						</button>
					) }
				</div>
			</div>
		);
	}
}

export default ComplexGroup;
