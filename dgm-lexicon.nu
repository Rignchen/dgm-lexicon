# Parse the content of a csv database file into a usable record
export def "open db" [
	file: string = public/db-prod.csv # The path to the csv database file
]: nothing -> record<tags: table<tag: string, color: string>, data: table<id: int, word: string, definition: string, first_time_used: string, tags: list<string>>> {
	open --raw $file
	| lines
	| split list -r '^,+$'
	| each {
		str join (char nl)
		| from csv
	}
	| {
		tags: (
			$in.0
			| select tag color
		)
		data: (
			$in.1
			| update tags {
				split row ','
			}
		)
	}
}

# Write the usable record into a csv database file
export def "save db" [
	file: string = public/db-prod.csv # The path to the csv database file
#]: record<tags: table<tag: string, color: string>, data: table<id: int, word: string, definition: string, first_time_used: string, tags: list<string>>> -> nothing {
] {
	update data {
		update tags {
			str join ','
		}
	}
	| values
	| each {
		to csv
	}
	| update 0 {
		lines
		| each {
			$in + ',,,' # Add columns to match the data table
		}
		| str join (char nl)
	}
	| str join ((char nl) + ',,,,' + (char nl))
	| save -f $file
}

# Update the content of the database
export def "update db" [
	callback: closure # A closure that takes the current database record and returns an updated database record
	file: string = public/db-prod.csv # The path to the csv database file
]: nothing -> nothing {
	open db $file
	| do $callback $in
	| save db $file
}
